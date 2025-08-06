import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ResponseLoggerMiddleware } from './middlewares/response.middleware';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    // app.use(LoggerMiddleware);
    // app.use(ResponseLoggerMiddleware)

    app.useGlobalInterceptors(new LoggingInterceptor(), new ResponseInterceptor())
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
