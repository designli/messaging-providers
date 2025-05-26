import { MessagingAdapter } from '@designli/messaging-providers/sender/interfaces/messaging-adapter.interface';
import { Logger } from '@nestjs/common';

export abstract class AbstractMessagingStrategy<T> {
  private readonly logger: Logger;

  constructor(protected readonly adapter: MessagingAdapter<T>) {
    this.logger = new Logger(this.constructor.name);
    this.logger.log('Messaging strategy initialized.');
  }

  async sendMessage(message: T): Promise<void> {
    const messageString = JSON.stringify(message, null, 2);
    const truncatedMessage =
      messageString.length > 500
        ? `${messageString.slice(0, 500)}... (truncated)`
        : messageString;

    const messageType = typeof message;

    try {
      this.logger.log({
        event: 'send_message_start',
        messageType,
        preview: truncatedMessage,
        fullLength: messageString.length,
      });

      await this.adapter.send(message);

      this.logger.log({
        event: 'send_message_success',
        messageType,
      });
    } catch (error) {
      this.logger.error(
        {
          event: 'send_message_error',
          messageType,
          preview: truncatedMessage,
          errorMessage: error.message,
        },
        error.stack,
      );
      throw error;
    }
  }
}
