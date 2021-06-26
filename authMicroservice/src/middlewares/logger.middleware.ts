import {
  Injectable,
  NestMiddleware,
  Next,
  Response,
  Request,
} from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(@Request() req: any, @Response() res: any, @Next() next: any) {
    console.log(`Agent : ${req.headers['user-agent']} - path: ${req.path}`);
    next();
  }
}
