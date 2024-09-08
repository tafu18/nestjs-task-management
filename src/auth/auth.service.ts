/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
    ){}

    async validateUserByJwt(payload: any): Promise<any> {
      const user = await this.usersService.findOneByUsername(payload.username); // Örneğin username'ı kullanarak bulma
      if (user) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        if (user && user.password === password) { // Şifre doğrulama işini gerçek şifreleme ve doğrulama mekanizması ile yapın
          const { password, ...result } = user;
          return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user._id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
 }
