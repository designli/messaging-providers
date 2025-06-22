import { DynamicModule, Provider, Type } from '@nestjs/common';
import { BaseWebhookHandler } from '../handlers/base/base-webhook.handler';

export interface MessageReceiverOptions {
  prefix: string;
  routes: WebhookRouteConfig[];
  providers?: Provider[];
  imports?: Array<Type<any> | DynamicModule>;
}

export interface WebhookRouteConfig {
  path: string;
  handler: Type<BaseWebhookHandler<any>>;
}
