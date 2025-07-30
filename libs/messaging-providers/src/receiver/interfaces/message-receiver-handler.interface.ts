import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class MessageReceiverHandler<T> {
  abstract handleMessage(payload: T): Promise<void>;
  abstract handle(req: any, body: any): Promise<any>;
}
