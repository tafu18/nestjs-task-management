import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('Required Roles:', requiredRoles); // Gerekli rolleri logla

    if (!requiredRoles) {
      console.log('No roles required, access granted.');
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('User Info:', user); // Kullanıcı bilgilerini logla

    if (!user) {
      console.error('No user found in request.');
      return false;
    }

    const hasRole = requiredRoles.includes(user.role);
    console.log('User Role:', user.role, '| Access Granted:', hasRole); // Kullanıcı rolünü ve erişim durumunu logla

    return hasRole;
  }
}
