import { NestMiddleware } from '@nestjs/common';
export declare class LoggerMainMiddleware implements NestMiddleware {
    use(req: any, res: any, next: any): void;
}
