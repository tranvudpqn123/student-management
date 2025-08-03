import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './student/middlewares/logger.middleware';
import { ResponseLoggerMiddleware } from './student/middlewares/response.middleware';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.use(LoggerMiddleware);
    app.use(ResponseLoggerMiddleware)
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
