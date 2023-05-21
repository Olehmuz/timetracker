import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

import { UserModule } from './../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ManagementService } from 'src/management/management.service';
import { ManagementModule } from 'src/management/management.module';

@Module({
	imports: [JwtModule.register({}), ConfigModule, UserModule, ManagementModule],
	controllers: [AuthController],
	providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
