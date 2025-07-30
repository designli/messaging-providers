import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { MessageReceiverHandler } from '../../interfaces/message-receiver-handler.interface';

@Injectable()
export abstract class BaseWebhookHandler<TBody>
  extends MessageReceiverHandler<TBody>
{
  abstract handleMessage(body: TBody): Promise<void>;

  async handle(req: any, body: any): Promise<any> {
    const messageType = req.headers['x-amz-sns-message-type'];

    if (!messageType) 
      throw new BadRequestException('Missing SNS message type');
    
    switch (messageType) {
      case 'SubscriptionConfirmation':
        await this.confirmSubscription(body);
        return { status: 'Subscription confirmed' };

      case 'Notification':
        await this.handleMessage(body);
        return { status: 'Message processed' };

      default:
        throw new BadRequestException(
          `Unsupported SNS message type: ${messageType}`,
        );
    }
  }

  async confirmSubscription(body: any): Promise<void> {
    const url = body.SubscribeURL;
    if (!url) throw new BadRequestException('Missing SubscribeURL');
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to confirm subscription. Status: ${response.status}`,
        );
      }
    } catch (err) {
      throw new Error(`Failed to confirm subscription: ${err.message}`);
    }
  }
}
