import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.SECRET_JWT_REFRESH_TOKEN,
			passReqToCallback: true,
		});
	}

	async validate(req: Request, payload: any): Promise<void> {
		const refreshToken = req.get('authorization').replace('Bearer', '').trim();
		return {
			...payload,
			refreshToken,
		};
	}
}
