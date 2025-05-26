import {
  IsString,
  IsEmail,
  IsArray,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Attachment } from 'nodemailer/lib/mailer';

export class SendEmailMessageDto {
  /**
   * The sender of the email
   */
  @IsEmail({}, { message: 'Sender must be a valid email address.' })
  sender: string;

  /**
   * The recipients to send the message to
   */
  @IsArray({ message: 'Recipients must be an array of email addresses.' })
  @IsEmail(
    {},
    { each: true, message: 'Each recipient must be a valid email address.' },
  )
  recipients: string[];

  /**
   * The message to be sent
   */
  @IsString({ message: 'Message must be a string.' })
  message: string;

  /**
   * The subject of the email
   */
  @IsOptional()
  @IsString({ message: 'Subject must be a string.' })
  subject?: string;

  /**
   * The attachments of the email
   */
  @IsOptional()
  @IsArray({ message: 'Attachments must be an array.' })
  attachments?: Attachment[];

  /**
   * The cc of the email
   */
  @IsOptional()
  @IsArray({ message: 'CC must be an array of email addresses.' })
  @IsEmail(
    {},
    { each: true, message: 'Each CC must be a valid email address.' },
  )
  cc?: string[];

  /**
   * The bcc of the email
   */
  @IsOptional()
  @IsArray({ message: 'BCC must be an array of email addresses.' })
  @IsEmail(
    {},
    { each: true, message: 'Each BCC must be a valid email address.' },
  )
  bcc?: string[];

  /**
   * Type of the email
   */
  @IsEnum(['html', 'text'], {
    message: 'Type must be either "html" or "text".',
  })
  type: 'html' | 'text';
}
