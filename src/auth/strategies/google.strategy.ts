import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
// import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './constants';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor() {
		super({
			clientID: '177032438057-pfsa61csajs93e6r2andfsav99et45qb.apps.googleusercontent.com',
			clientSecret: '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',
			callbackURL: 'http://localhost:3000/auth/google/callback',
			scope: ['email', 'profile'],
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: any,
		done: VerifyCallback,
	): Promise<void> {
		console.log(accessToken);
		const { id } = profile;
		done(null, id);
	}
}
