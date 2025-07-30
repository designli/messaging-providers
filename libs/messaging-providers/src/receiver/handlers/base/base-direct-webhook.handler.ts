import { BadRequestException, Injectable } from '@nestjs/common';
import { MessageReceiverHandler } from '../../interfaces/message-receiver-handler.interface';

@Injectable()
export abstract class BaseDirectWebhookHandler<
  TBody,
  RBody,
> extends MessageReceiverHandler<TBody> {
  abstract handleMessage(body: TBody): Promise<void>;

  abstract normalizeBody(body: RBody): TBody | Promise<TBody>;

  async handle(req: any, body: RBody): Promise<any> {
    if (!body) throw new BadRequestException('Missing request body');

    const normalizedBody = await this.normalizeBody(body);
    await this.handleMessage(normalizedBody);
    return { status: 'Message processed' };
  }
}
