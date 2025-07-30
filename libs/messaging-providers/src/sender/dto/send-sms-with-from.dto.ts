import { IsString, Matches } from 'class-validator';
import { SendSMSMessageDto } from './send-sms-message.dto';
import { PickType } from '@nestjs/swagger';

export class SendSMSWithFromNumber extends PickType(SendSMSMessageDto, [
  'recipient',
  'message',
] as const) {
  /**
   * The sender ID to use for the message
   */
  @IsString()
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message: 'From phone number must be in E.164 format (e.g., +573001112233)',
  })
  from: string;
}
