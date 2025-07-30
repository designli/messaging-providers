import { Injectable } from '@nestjs/common';
import { MessageReceiverHandler } from '../interfaces/message-receiver-handler.interface';

@Injectable()
export class MessageRouterService {
  private readonly routes = new Map<string, MessageReceiverHandler<any>>();

  registerRoute(path: string, Handler: MessageReceiverHandler<any>) {
    this.routes.set(path, Handler);
  }

  getHandlerForPath(path: string): MessageReceiverHandler<any> | undefined {
    return this.routes.get(path);
  }
}
