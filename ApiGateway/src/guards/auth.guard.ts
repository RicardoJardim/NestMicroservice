import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('AUTH_SERVICE') private readonly clientProxy: ClientProxy,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (
      !request.headers['authorization'] ||
      !request.headers['authorization'].includes('Bearer')
    ) {
      return false;
    }

    const token = request.headers['authorization'].split('Bearer');
    if (token[1].length != 0) {
      return VerifyTokenMicroService(token[1].trim(), this.clientProxy);
    }
    return false;
  }
}

async function VerifyTokenMicroService(
  tokenBearer: string,
  clientProxy: ClientProxy,
): Promise<boolean> {
  try {
    const res = await clientProxy
      .send({ cmd: 'token', role: 'auth' }, { token: tokenBearer })
      .pipe(timeout(5000))
      .toPromise();
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}
