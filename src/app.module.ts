import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './common/guards';
import { UserModule } from './user/user.module';
import { TrackerModule } from './tracker/tracker.module';
import { ManagementModule } from './management/management.module';
import { PayslipModule } from './payslip/payslip.module';

@Module({
	imports: [
		AuthModule,
		ConfigModule.forRoot(),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				uri: process.env.MONGODB_URI,
			}),
		}),
		UserModule,
		TrackerModule,
		ManagementModule,
		PayslipModule,
	],
	exports: [UserModule],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: AccessTokenGuard,
		},
	],
})
export class AppModule {}
