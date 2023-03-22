import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/googleStrategy';

@Module({
	imports: [
		PassportModule.register({
			defaultStrategy: 'google',
			session: true,
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}