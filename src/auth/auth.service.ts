import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UserDTO } from './../user/dto/user.dto';
import { USER_NOT_FOUND } from './../user/user.constants';
import { UserService } from './../user/user.service';
import { Tokens } from './types/tokens.type';
import { EXPIRE_IN_TIME_ACCESS, EXPIRE_IN_TIME_REFRESH } from './auth.constants';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	async getTokens(
		googleId: string,
		email: string,
		picture: string,
		name: string,
		surname: string,
		id: string,
	): Promise<Tokens> {
		const [at, rt] = await Promise.all([
			this.jwtService.sign(
				{ googleId, email, picture, name, surname, id },
				{
					expiresIn: EXPIRE_IN_TIME_ACCESS,
					secret: process.env.SECRET_JWT_ACCESS_TOKEN,
				},
			),
			this.jwtService.sign(
				{ googleId, email, picture, name, surname, id },
				{
					expiresIn: EXPIRE_IN_TIME_REFRESH,
					secret: process.env.SECRET_JWT_REFRESH_TOKEN,
				},
			),
		]);
		return {
			access_token: at,
			refresh_token: rt,
		};
	}

	async hashData(data: string): Promise<string> {
		return await hash(data, parseInt(process.env.SALT));
	}

	async hashRT(userId: string, rt: string): Promise<string> {
		const hashedRT = await this.hashData(rt);
		await this.userService.findOneAndUpdateHash(userId, hashedRT);
		return hashedRT;
	}

	async singupLocal(dto: UserDTO): Promise<Tokens> {
		const newUser = await this.userService.createUser(dto);
		const tokens = await this.getTokens(
			newUser.googleId,
			newUser.email,
			newUser.picture,
			newUser.name,
			newUser.surname,
			newUser.id,
		);
		await this.hashRT(newUser.id, tokens.refresh_token);
		return tokens;
	}

	async loginOrRegister(dto: UserDTO): Promise<Tokens> {
		let user;
		try {
			user = await this.userService.findUserByGoogleId(dto.googleId);
		} catch (e) {
			if (e.message === USER_NOT_FOUND) {
				const newUser = await this.userService.createUser(dto);
				user = newUser;
			}
		}

		const tokens = await this.getTokens(
			user.googleId,
			user.email,
			user.picture,
			user.name,
			user.surname,
			user.id,
		);
		await this.hashRT(user.id, tokens.refresh_token);

		return tokens;
	}

	async singinLocal(dto: UserDTO): Promise<Tokens> {
		const user = await this.userService.findUserByGoogleId(dto.googleId);
		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND);
		}
		const tokens = await this.getTokens(
			user.googleId,
			user.email,
			user.picture,
			user.name,
			user.surname,
			user.id,
		);
		await this.hashRT(user.id, tokens.refresh_token);

		return tokens;
	}

	async logout(id: string): Promise<void> {
		await this.userService.findOneByAndUpdate(
			{ _id: id, hashedRT: { $ne: null } },
			{ hashedRT: null },
		);
	}

	async refreshTokens(id: string, rt: string): Promise<Tokens> {
		const user = await this.userService.findOne({ _id: id });
		if (!user || !user.hashedRT) {
			throw new ForbiddenException('Access denied');
		}

		const rtMatches = await compare(rt, user.hashedRT);
		if (!rtMatches) {
			throw new ForbiddenException('Access denied');
		}

		const tokens = await this.getTokens(
			user.googleId,
			user.email,
			user.picture,
			user.name,
			user.surname,
			user.id,
		);
		await this.hashRT(user.id, tokens.refresh_token);

		return tokens;
	}

	async validateUser(googleId: string, email: string): Promise<any> {
		const user = await this.userService.findUserByGoogleId(googleId);
		if (user && user.email === email) {
			return user;
		}
		return null;
	}
}
