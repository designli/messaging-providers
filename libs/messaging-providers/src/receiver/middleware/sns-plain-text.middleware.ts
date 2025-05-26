// sns-body-parser.middleware.ts
import {
  Injectable,
  NestMiddleware,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as getRawBody from 'raw-body';

@Injectable()
export class SnsBodyParserMiddleware implements NestMiddleware {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(SnsBodyParserMiddleware.name);
  }

  async use(req: Request, res: Response, next: NextFunction) {
    if (
      req.headers['content-type']?.includes('text/plain') &&
      (!req.body || Object.keys(req.body).length === 0)
    ) {
      try {
        const raw = await getRawBody(req, {
          encoding: true,
          length: req.headers['content-length'],
        });

        req.body = JSON.parse(raw);
      } catch (err) {
        this.logger.error(`Error parsing SNS plain text body: ${err.message}`, err.stack);
        throw new BadRequestException('Invalid plain text JSON body from SNS');
      }
    }

    next();
  }
}
