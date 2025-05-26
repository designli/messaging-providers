import { SendEmailMessageDto } from '@designli/messaging-providers/sender/dto/send-email-message.dto';
import { AbstractMessagingStrategy } from '../base/abstract.strategy';
import { Injectable, Logger } from '@nestjs/common';
import { MessagingAdapter } from '../../interfaces/messaging-adapter.interface';

@Injectable()
export class AwsEmailStrategy extends AbstractMessagingStrategy<SendEmailMessageDto> {
  constructor(adapter: MessagingAdapter<SendEmailMessageDto>) {
    super(adapter);
  }
}
