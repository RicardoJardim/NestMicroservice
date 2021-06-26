import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
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

    let token = request.headers['authorization'].split('Bearer');
    if (token[1].length != 0) {
      return VerifyToken(token[1].trim());
    }
    return false;
  }
}

function VerifyToken(tokenBearer: string): boolean {
  if (tokenBearer == '12345') {
    return true;
  }
  return false;
}
