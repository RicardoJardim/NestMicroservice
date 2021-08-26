import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
export declare class AuthGuard implements CanActivate {
    private readonly clientProxy;
    constructor(clientProxy: ClientProxy);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
