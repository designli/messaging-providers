// message-receiver.controller-factory.ts
import {
  Controller,
  Post,
  Req,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { MessageRouterService } from '../services/message-router.service';

export function createMessageReceiverController(prefix: string): any {
  @Controller(prefix)
  class DynamicMessageReceiverController {
    constructor(private readonly router: MessageRouterService) {}

    @Post('*')
    async handle(@Req() req: Request) {
      const path = req.path.replace(`/${prefix}`, '');
      const handler = this.router.getHandlerForPath(path || '/');

      const body = req.body;

      if (!handler)
        throw new NotFoundException(`No handler found for path ${path}`);

      await handler.handle(req, body);
      return { status: 'ok' };
    }
  }

  return DynamicMessageReceiverController;
}
