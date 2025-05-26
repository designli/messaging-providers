import { SendEmailMessageDto } from '@designli/messaging-providers/sender/dto/send-email-message.dto';
import { NodemailerAdapter } from '../nodemailer/nodemailer.adapter';
import { Options } from 'nodemailer/lib/smtp-transport';
import { SesTransportDto } from '@designli/messaging-providers/sender/dto/adapters/ses-transport.dto';
import { validateInput } from '@designli/messaging-providers/commons/validator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SesEmailAdapter extends NodemailerAdapter<SendEmailMessageDto> {
  constructor(transporterOptions: SesTransportDto) {
    validateInput(transporterOptions, SesTransportDto);
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
  }

  getMailOptions(message: SendEmailMessageDto): Options {
    validateInput(message, SendEmailMessageDto);

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

    return options;
  }
}
