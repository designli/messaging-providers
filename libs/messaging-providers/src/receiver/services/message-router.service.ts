import { Injectable } from '@nestjs/common';
import { BaseWebhookHandler } from '../handlers/base/base-webhook.handler';

@Injectable()
export class MessageRouterService {
  private readonly routes = new Map<string, BaseWebhookHandler<any>>();

  registerRoute(path: string, Handler: BaseWebhookHandler<any>) {
    this.routes.set(path, Handler);
  }

  getHandlerForPath(path: string): BaseWebhookHandler<any> | undefined {
    return this.routes.get(path);
  }
}
