import { Injectable } from '@nestjs/common';
import { MessagingAdapter } from '../../interfaces/messaging-adapter.interface';
import { SendSMSWithFromNumber } from '../../dto/send-sms-with-from.dto';
import { TwilioSMSAdapterOptions } from '../../dto/adapters/twilio-sms-adapter';

import { Twilio } from 'twilio';
import { validateInput } from '@designli/messaging-providers/commons/validator';

@Injectable()
export class TwilioSmsAdapter
  implements MessagingAdapter<SendSMSWithFromNumber>
{
  private readonly client: Twilio;

  constructor(config: TwilioSMSAdapterOptions) {
    validateInput(config, TwilioSMSAdapterOptions);
    this.client = new Twilio(config.accountSid, config.authToken);
  }

  async send(message: SendSMSWithFromNumber): Promise<string> {
    validateInput(message, SendSMSWithFromNumber);

    const response = await this.client.messages.create({
      body: message.message,
      from: message.from,
      to: message.recipient,
    });

    if (!response.sid)
      throw new Error('Failed to send SMS message via Twilio.');

    return response.sid;
  }
}
