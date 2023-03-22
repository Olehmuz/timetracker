import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

interface GoogleResponce {
	statusCode: number;
	message: string;
	data: string;
}

@Controller('auth')
export class AuthController {
	@Get('google')
	@UseGuards(AuthGuard('google'))
	async googleAuth(@Req() req): Promise<void> {}

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
}
