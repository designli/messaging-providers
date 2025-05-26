import { Injectable } from '@nestjs/common';
import { DefaultSmsDto } from '../../dto/default-sms.dto';
import { BaseWebhookStrategy } from './base-webhook.strategy';

@Injectable()
export abstract class BaseSMSWebhookStrategy<
  TBody extends DefaultSmsDto = DefaultSmsDto,
> extends BaseWebhookStrategy<TBody> {
  abstract handleMessage(body: TBody): Promise<void>;
}
