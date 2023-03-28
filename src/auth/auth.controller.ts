import { Controller, Get, Req, UseGuards, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDTO } from './../user/dto/user.dto';
import { AuthService } from './auth.service';
import { GetCurrentUser } from '../common/decorators';
import { RefreshTokenGuard } from '../common/guards';
import { Tokens } from './types/tokens.type';
import { Public } from './../common/decorators/public.decorator';

interface GoogleResponce {
	statusCode: number;
	message: string;
	data: string;
}

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Get('google')
	@UseGuards(AuthGuard('google'))
	async googleAuth(@Req() req): Promise<void> {}

	@Public()
	@Get('google/callback')
	@UseGuards(AuthGuard('google'))
	googleAuthRedirect(@Req() req): GoogleResponce {
		console.log(req.user);
		return {
			statusCode: 200,
			message: 'Google ID has been successfully retrieved!',
			data: req.user as string,
		};
	}

	@Public()
	@Post('local/signup')
	singupLocal(@Body() dto: UserDTO): Promise<Tokens> {
		return this.authService.singupLocal(dto);
	}

	@Public()
	@Post('local/signin')
	@HttpCode(HttpStatus.OK)
	singinLocal(@Body() dto: UserDTO): Promise<Tokens> {
		return this.authService.singinLocal(dto);
	}

	@Public()
	@Post('local/google')
	@HttpCode(HttpStatus.OK)
	async google(@Body() dto: UserDTO): Promise<Tokens> {
		return await this.authService.loginOrRegister(dto);
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	logout(@GetCurrentUser('id') id: string): string {
		this.authService.logout(id);
		return 'logouted!';
	}

	@Public()
	@UseGuards(RefreshTokenGuard)
	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	async refreshTokens(
		@GetCurrentUser('id') id: string,
		@GetCurrentUser('refreshToken') refreshToken: string,
	): Promise<Tokens> {
		return await this.authService.refreshTokens(id, refreshToken);
	}
}
