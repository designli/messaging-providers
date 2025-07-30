import { DefaultSmsDto } from '@designli/messaging-providers/receiver/dto/default-sms.dto';

import { TwilioSmsDto } from '@designli/messaging-providers/receiver/dto/twilio/twilio-sms.dto';
import { Injectable } from '@nestjs/common';
import { BaseDirectWebhookHandler } from '../base/base-direct-webhook.handler';

@Injectable()
export abstract class TwilioSmsWebhookHandler<
  TBody extends DefaultSmsDto = DefaultSmsDto,
> extends BaseDirectWebhookHandler<TBody, TwilioSmsDto> {
  abstract handleMessage(body: TBody): Promise<void>;

  normalizeBody(body: TwilioSmsDto): TBody {
    return {
      originationNumber: body.From,
      destinationNumber: body.To,
      messageBody: body.Body,
      inboundMessageId: body.MessageSid,
      messageKeyword: '',
      previousPublishedMessageId: '',
    } as TBody;
  }
}
