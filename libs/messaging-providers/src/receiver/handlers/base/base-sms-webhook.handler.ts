import { Injectable } from '@nestjs/common';
import { DefaultSmsDto } from '../../dto/default-sms.dto';
import { BaseWebhookHandler } from './base-webhook.handler';

@Injectable()
export abstract class BaseSMSWebhookHandler<
  TBody extends DefaultSmsDto = DefaultSmsDto,
> extends BaseWebhookHandler<TBody> {
  abstract handleMessage(body: TBody): Promise<void>;
}
