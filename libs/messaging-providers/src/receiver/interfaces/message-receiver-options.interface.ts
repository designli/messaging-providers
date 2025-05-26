import { Type } from '@nestjs/common';
import { BaseWebhookStrategy } from '../strategies/base/base-webhook.strategy';

export interface MessageReceiverOptions {
  prefix: string;
  routes: WebhookRouteConfig[];
}

export interface WebhookRouteConfig {
  path: string;
  strategy: Type<BaseWebhookStrategy<any>>;
}
