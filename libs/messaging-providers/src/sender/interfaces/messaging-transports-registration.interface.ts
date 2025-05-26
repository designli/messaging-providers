import { Type } from '@nestjs/common';

export interface MessagingTransportRegistration<
  TAdapter = any,
  TStrategy = any,
> {
  transportKey: string;
  adapterClass: Type<TAdapter>;
  strategyClass: Type<TStrategy>;
  adapterFactory: (options: any) => TAdapter;
}
