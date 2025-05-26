import { Injectable } from '@nestjs/common';
import { DefaultMailDto } from '../../dto/default-mail.dto';
import { BaseWebhookStrategy } from './base-webhook.strategy';

@Injectable()
export abstract class BaseMailWebhookStrategy<
  TBody extends DefaultMailDto = DefaultMailDto,
> extends BaseWebhookStrategy<TBody> {}
