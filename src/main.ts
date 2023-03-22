import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: '*',
	});
	const configService = app.get(ConfigService);
	const port = process.env.PORT;
	await app.listen(port || 3001);
}
bootstrap();
