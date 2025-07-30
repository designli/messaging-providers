import { DynamicModule, Provider, Type } from '@nestjs/common';
import { MessageReceiverHandler } from './message-receiver-handler.interface';

export interface MessageReceiverOptions {
  prefix: string;
  routes: WebhookRouteConfig[];
  providers?: Provider[];
  imports?: Array<Type<any> | DynamicModule>;
}

export interface WebhookRouteConfig {
  path: string;
  handler: Type<MessageReceiverHandler<any>>;
}
