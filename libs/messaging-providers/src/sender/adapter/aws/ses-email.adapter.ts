import { SendEmailMessageDto } from '@designli/messaging-providers/sender/dto/send-email-message.dto';
import { NodemailerAdapter } from '../nodemailer/nodemailer.adapter';
import { Options } from 'nodemailer/lib/smtp-transport';
import { SesTransportDto } from '@designli/messaging-providers/sender/dto/adapters/ses-transport.dto';
import { validateInput } from '@designli/messaging-providers/commons/validator';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SesEmailAdapter extends NodemailerAdapter<SendEmailMessageDto> {
  private readonly logger: Logger;

  constructor(transporterOptions: SesTransportDto) {
    super({
      host: transporterOptions.awsHost,
      port: transporterOptions.awsPort,
      secure: true,
      auth: {
        user: transporterOptions.awsUsername,
        pass: transporterOptions.awsPassword,
      },
      debug: transporterOptions.debug ?? false,
    });

    this.logger = new Logger(SesEmailAdapter.name);

    validateInput(transporterOptions, SesTransportDto);
  }

  getMailOptions(message: SendEmailMessageDto): Options {
    try {
      validateInput(message, SendEmailMessageDto);
    } catch (error) {
      this.logger.error(`Validation failed for SendEmailMessageDto: ${error}`);
      throw error;
    }

    const options: Options = {
      from: message.sender,
      to: message.recipients,
      attachments: message.attachments,
    };

    if (message.subject) options.subject = message.subject;
    if (message.cc) options.cc = message.cc;
    if (message.bcc) options.bcc = message.bcc;
    if (message.type === 'text') options.text = message.message;
    if (message.type === 'html') options.html = message.message;
    if (message.headers) options.headers = message.headers;

    return options;
  }

  extractSesMessageId(response: string): string | null {
    const parts = response.trim().split(' ');
    const candidate = parts[parts.length - 1];
    return candidate.length > 20 ? candidate : null;
  }

  async send(message: SendEmailMessageDto): Promise<string> {
    const reponse = await super.send(message);

    const messageId = this.extractSesMessageId(reponse);

    if (!messageId)
      throw new Error('Failed to extract SES Message ID from response.');

    return messageId;
  }
}
