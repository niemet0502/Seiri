import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import { AppModule } from './app.module';

async function bootstrap() {
  config();

  const app = await NestFactory.create(AppModule);

  const SwaggerConfig = new DocumentBuilder()
    .setTitle('Seiri API Doc')
    .setDescription('The seiri API description')
    .addTag('api')
    .build();

  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  await app.listen(process.env.PORT);
}
bootstrap();
