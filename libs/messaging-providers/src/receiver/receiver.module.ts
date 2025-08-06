import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  Provider,
} from '@nestjs/common';
import { MessageReceiverOptions } from './interfaces/message-receiver-options.interface';
import { MessageRouterService } from './services/message-router.service';
import { createMessageReceiverController } from './mixins/message-receiver-controller.mixin';
import { SnsBodyParserMiddleware } from './middleware/sns-plain-text.middleware';
import { TwilioBodyParserMiddleware } from './middleware/twilio-body-parser.middleware';

/**
 * Module for registering message receiver strategies.
 * @example
 * ```typescript
 * \@Module({
 *   imports: [
 *     MessagingProvidersReceiverModule.register({
 *       prefix: 'webhooks',
 *       routes: [
 *         { path: '/email', strategy: YourExtendedBaseWebhookStrategy },
 *         { path: '/sms', strategy: YourExtendedBaseWebhookStrategy },
 *       ],
 *     }),
 *   ],
 * })
 * export class AppModule {}
 * ```
 */
@Module({})
export class MessagingProvidersReceiverModule implements NestModule {
  static register(options: MessageReceiverOptions): DynamicModule {
    const prefix = options.prefix;

    const controller = createMessageReceiverController(
      prefix,
      options.publicMetadata,
    );

    const providers: Provider[] = [MessageRouterService];
    const handlerProviders: Provider[] = [];

    for (const route of options.routes) {
      providers.push(route.handler);

      handlerProviders.push({
        provide: `REGISTER_ROUTE_${route.path}`,
        useFactory: (router: MessageRouterService, strategyInstance: any) => {
          router.registerRoute(route.path, strategyInstance);
        },
        inject: [MessageRouterService, route.handler],
      });
    }

    return {
      module: MessagingProvidersReceiverModule,
      controllers: [controller],
      providers: [
        ...providers,
        ...handlerProviders,
        ...(options.providers || []),
      ],
      imports: [...(options.imports || [])],
    };
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SnsBodyParserMiddleware, TwilioBodyParserMiddleware)
      .forRoutes('*');
  }
}
