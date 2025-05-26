import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { SenderModuleOptions } from './interfaces/sender-module-options.interface';

/**
 * @module MessagingProvidersSenderModule
 * @example
 * MessagingProvidersSenderModule.forRoot({
 *  transports: [
 *    {
 *      transportKey: EMAIL_STRATEGY,
 *      adapterClass: SesEmailAdapter,
 *      strategyClass: AwsEmailStrategy,
 *      adapterFactory: (config) => new SesEmailAdapter(config),
 *    },
 *    {
 *      transportKey: SMS_STRATEGY,
 *      adapterClass: SnsSmsAdapter,
 *      strategyClass: AwsSmsStrategy,
 *      adapterFactory: (config) => new SnsSmsAdapter(config.region),
 *    },
 *  ],
 *  config: {
 *    [EMAIL_STRATEGY]: {
 *      awsHost: 'smtp.example.com',
 *      awsPort: 587,
 *      awsUsername: 'user@example.com',
 *      awsPassword: 'securepassword',
 *    },
 *    [SMS_STRATEGY]: {
 *      region: 'us-east-1',
 *    },
 *  },
 *});
 */
@Global()
@Module({})
export class MessagingProvidersSenderModule {
  static forRoot(options: SenderModuleOptions): DynamicModule {
    const providers: Provider[] = [];

    for (const registration of options.transports) {
      const { transportKey, strategyClass, adapterFactory } = registration;
      const adapterToken = `${transportKey}Adapter`;
      const strategyToken = `${transportKey}`;

      providers.push({
        provide: adapterToken,
        useValue: adapterFactory(options.config[transportKey]),
      });

      providers.push({
        provide: strategyToken,
        useFactory: (adapter) => new strategyClass(adapter),
        inject: [adapterToken],
      });
    }

    return {
      module: MessagingProvidersSenderModule,
      providers,
      exports: providers.map((p) => (typeof p === 'object' ? p.provide : p)),
    };
  }
}
