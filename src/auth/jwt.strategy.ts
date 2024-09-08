import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }
  
  async validate(payload: any) {
    // Token'dan alınan payload'ı doğrulamak ve kullanıcıyı bulmak
    const user = await this.authService.validateUserByJwt(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user; // `req.user` olarak döndürülür
  }
}




