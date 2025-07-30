import { Injectable } from '@nestjs/common';
import { AbstractMessagingStrategy } from '../base/abstract.strategy';
import { MessagingAdapter } from '../../interfaces/messaging-adapter.interface';
import { SendSMSWithFromNumber } from '../../dto/send-sms-with-from.dto';

@Injectable()
export class TwilioSmsStrategy extends AbstractMessagingStrategy<SendSMSWithFromNumber> {
  constructor(adapter: MessagingAdapter<SendSMSWithFromNumber>) {
    super(adapter);
  }
}
