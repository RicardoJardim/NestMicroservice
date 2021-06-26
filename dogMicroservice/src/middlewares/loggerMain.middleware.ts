import {
  Injectable,
  NestMiddleware,
  Next,
  Response,
  Request,
} from '@nestjs/common';

@Injectable()
export class LoggerMainMiddleware implements NestMiddleware {
  use(@Request() req: any, @Response() res: any, @Next() next: any) {
    console.log(`Main Logger - path: ${req.path}`);
    next();
  }
}
