import { SendSMSMessageDto } from '@designli/messaging-providers/sender/dto/send-sms-message.dto';
import { AbstractMessagingStrategy } from '../base/abstract.strategy';
import { Injectable } from '@nestjs/common';
import { MessagingAdapter } from '../../interfaces/messaging-adapter.interface';

@Injectable()
export class AwsSmsStrategy extends AbstractMessagingStrategy<SendSMSMessageDto> {
  constructor(adapter: MessagingAdapter<SendSMSMessageDto>) {
    super(adapter);
  }
}
