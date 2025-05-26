// message-receiver.controller-factory.ts
import {
  Controller,
  Post,
  Req,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { Request, Router } from 'express';
import { MessageRouterService } from '../services/message-router.service';

export function createMessageReceiverController(prefix: string): any {
  @Controller(prefix)
  class DynamicMessageReceiverController {
    constructor(private readonly router: MessageRouterService) {}

    @Post('*')
    async handle(@Req() req: Request) {
      const path = req.path.replace(`/${prefix}`, '');
      const strategy = this.router.getStrategyForPath(path || '/');

      const body = req.body;

      if (!strategy)
        throw new NotFoundException(`No strategy found for path ${path}`);

      await strategy.handle(req, body);
      return { status: 'ok' };
    }
  }

  return DynamicMessageReceiverController;
}
