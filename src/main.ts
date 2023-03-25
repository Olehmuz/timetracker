import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AccessTokenGuard } from './common/guards';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: '*',
	});
	app.useGlobalPipes(new ValidationPipe());
	const port = process.env.PORT;
	await app.listen(port || 3001);
}
bootstrap();
