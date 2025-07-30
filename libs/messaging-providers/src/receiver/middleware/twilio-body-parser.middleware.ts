import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as getRawBody from 'raw-body';
import * as querystring from 'querystring';

@Injectable()
export class TwilioBodyParserMiddleware implements NestMiddleware {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(TwilioBodyParserMiddleware.name);
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const contentType = req.headers['content-type'];

    if (
      contentType?.includes('application/x-www-form-urlencoded') &&
      (!req.body || Object.keys(req.body).length === 0)
    ) {
      try {
        const raw = await getRawBody(req, {
          encoding: true,
          length: req.headers['content-length'],
        });

        req.body = querystring.parse(raw);
      } catch (err) {
        this.logger.error('Error parsing Twilio body:', err);
        req.body = {};
      }
    }

    next();
  }
}
