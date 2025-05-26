import { IsIn, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SendSMSMessageDto {
  /**
   * The message to be sent
   */
  @IsString()
  @MinLength(1, {
    message: 'Message must not be empty',
  })
  @MaxLength(1600, {
    message: 'Message must be 1600 characters or fewer',
  })
  message: string;

  /**
   * The recipients to send the message to
   */
  @IsString()
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message: 'Phone number must be in E.164 format (e.g., +573001112233)',
  })
  recipient: string;

  /**
   * The sender ID to use for the message
   */
  @IsString()
  @IsIn(['Transactional', 'Promotional'], {
    message: 'Type must be either "Transactional" or "Promotional"',
  })
  type: 'Transactional' | 'Promotional';
}
