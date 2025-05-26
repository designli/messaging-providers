import { SendSMSMessageDto } from '@designli/messaging-providers/sender/dto/send-sms-message.dto';
import { MessagingAdapter } from '../../interfaces/messaging-adapter.interface';
import {
  GetSMSAttributesCommand,
  PublishCommand,
  PublishCommandInput,
  SetSMSAttributesCommand,
  SNSClient,
} from '@aws-sdk/client-sns';
import { validateInput } from '@designli/messaging-providers/commons/validator';
import { Injectable } from '@nestjs/common';
import { SNSSMSAdapterOptions } from '../../dto/adapters/sns-sms-adapter';

@Injectable()
export class SnsSmsAdapter implements MessagingAdapter<SendSMSMessageDto> {
  private readonly client: SNSClient;

  constructor(config: SNSSMSAdapterOptions) {
    validateInput(config, SNSSMSAdapterOptions);
    this.client = new SNSClient({
      region: config.region,
      credentials: config.credentials,
    });
  }

  _getPublishInput(message: SendSMSMessageDto): PublishCommandInput {
    return {
      Message: message.message,
      PhoneNumber: message.recipient,
      MessageAttributes: {
        'AWS.SNS.SMS.SMSType': {
          DataType: 'String',
          StringValue: message.type,
        },
      },
    };
  }
  /**
   * Sends an SMS message using AWS SNS.
   * @param message The message object containing the recipient, message, and type.
   */
  async send(message: SendSMSMessageDto): Promise<void> {
    validateInput(message, SendSMSMessageDto);

    const input = this._getPublishInput(message);
    const command = new PublishCommand(input);
    await this.client.send(command);
  }
}
