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

    const controller = createMessageReceiverController(prefix);

    const providers: Provider[] = [MessageRouterService];
    const strategyProviders: Provider[] = [];

    for (const route of options.routes) {
      providers.push(route.strategy);

      strategyProviders.push({
        provide: `REGISTER_ROUTE_${route.path}`,
        useFactory: (router: MessageRouterService, strategyInstance: any) => {
          router.registerRoute(route.path, strategyInstance);
        },
        inject: [MessageRouterService, route.strategy],
      });
    }

    return {
      module: MessagingProvidersReceiverModule,
      controllers: [controller],
      providers: [...providers, ...strategyProviders],
    };
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SnsBodyParserMiddleware).forRoutes('*');
  }
}
