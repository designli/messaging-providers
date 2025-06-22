import { Injectable } from '@nestjs/common';
import { DefaultMailDto } from '../../dto/default-mail.dto';
import { BaseWebhookHandler } from './base-webhook.handler';

@Injectable()
export abstract class BaseMailWebhookHandler<
  TBody extends DefaultMailDto = DefaultMailDto,
> extends BaseWebhookHandler<TBody> {}
