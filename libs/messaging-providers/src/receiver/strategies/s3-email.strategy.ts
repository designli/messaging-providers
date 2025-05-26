import { Injectable, Logger } from '@nestjs/common';
import { DefaultMailDto } from '../dto/default-mail.dto';
import { BaseMailWebhookStrategy } from './base/base-mail-webhook.strategy';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { simpleParser } from 'mailparser';
import { ParsedEmail } from '../dto/parsed-email.dto';

/**
 * Abstract strategy for handling email messages with attachments from S3.
 * This strategy extends the BaseMailWebhookStrategy and provides
 * @requires AWS_S3_KEY environment variable for S3 access key
 * @requires AWS_S3_SECRET environment variable for S3 secret key
 */
@Injectable()
export abstract class S3EmailStrategy extends BaseMailWebhookStrategy<DefaultMailDto> {
  private readonly logger: Logger;

  constructor() {
    super();
    this.logger = new Logger(S3EmailStrategy.name);
  }

  abstract handleParsedEmail(body: ParsedEmail): Promise<void>;

  _getCredentialsFromEnv() {
    const accessKeyId = process.env.AWS_S3_KEY;
    const secretAccessKey = process.env.AWS_S3_SECRET;

    if (!accessKeyId || !secretAccessKey)
      throw new Error(
        'Missing AWS S3 credentials in environment variables. Please set AWS_S3_KEY and AWS_S3_SECRET.',
      );

    return { accessKeyId, secretAccessKey };
  }

  _extractRegion(arn: string) {
    return arn.split(':')[3];
  }

  /**
   * Handles incoming email messages from SNS.
   * should get the email content from the S3 bucket and call `handleMessageWithAttachments`.
   */
  async handleMessage(mail: DefaultMailDto): Promise<void> {
    const credentials = this._getCredentialsFromEnv();

    const region = this._extractRegion(mail.receipt.action.topicArn);
    const bucketName = mail.receipt.action.bucketName;
    const objectKey = mail.receipt.action.objectKey;

    const client = new S3Client({
      region,
      credentials,
    });

    const params = {
      Bucket: bucketName,
      Key: objectKey,
    };

    try {
      const command = new GetObjectCommand(params);
      const data = await client.send(command);

      const body = await data.Body?.transformToString();

      if (!body || body === undefined || body === null)
        throw new Error('Email body is empty or undefined');

      const parsedEmail = await simpleParser(body || '');

      await this.handleParsedEmail(parsedEmail);
    } catch (error) {
      this.logger.error(
        `Error retrieving email from S3: ${error.message}`,
        error.stack,
      );
    }
  }
}
