import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: '*',
	});
	app.useGlobalPipes(new ValidationPipe());
	const port = process.env.PORT;

	const config = new DocumentBuilder()
		.setTitle('ITFIN API')
		.setDescription('The ITFIN API description')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(port || 3001);
}
bootstrap();
