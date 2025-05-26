import { MessagingAdapter } from '../../interfaces/messaging-adapter.interface';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export abstract class NodemailerAdapter<T> implements MessagingAdapter<T> {
  private readonly transporter: nodemailer.Transporter;

  constructor(transporterOptions: SMTPTransport.Options) {
    this.transporter = nodemailer.createTransport(transporterOptions);
  }

  abstract getMailOptions(message: T): SMTPTransport.Options;

  async send(message: T): Promise<void> {
    await this.transporter.sendMail(this.getMailOptions(message));
  }
}
