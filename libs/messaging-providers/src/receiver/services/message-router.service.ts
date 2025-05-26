import { Injectable } from '@nestjs/common';
import { BaseWebhookStrategy } from '../strategies/base/base-webhook.strategy';

@Injectable()
export class MessageRouterService {
  private readonly routes = new Map<string, BaseWebhookStrategy<any>>();

  registerRoute(path: string, strategy: BaseWebhookStrategy<any>) {
    this.routes.set(path, strategy);
  }

  getStrategyForPath(path: string): BaseWebhookStrategy<any> | undefined {
    return this.routes.get(path);
  }
}
