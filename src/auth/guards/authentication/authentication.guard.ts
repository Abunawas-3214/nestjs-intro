import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthType } from 'src/auth/enum/auth-type.enum';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer

  private readonly authTypeGuuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
      [AuthType.Bearer]: this.accesTokenGuard,
      [AuthType.None]: { canActivate: () => true }
    }
  constructor(
    private readonly reflector: Reflector,
    private readonly accesTokenGuard: AccessTokenGuard,
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    // authTypes from reflecor
    const authTypes = this.reflector.getAllAndOverride(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthenticationGuard.defaultAuthType];

    const guards = authTypes.map((type) => this.authTypeGuuardMap[type]).flat();

    // default error
    const error = new UnauthorizedException();

    // Loop through the guards canAcctivate
    for (const instance of guards) {
      const canActivate = await Promise.resolve(
        instance.canActivate(context)
      ).catch((err) => {
        error.cause = err;
      });

      if (canActivate) {
        return true;
      }
    }
    throw error;
  }
}
