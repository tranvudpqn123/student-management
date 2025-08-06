import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ResponseLoggerMiddleware } from './middlewares/response.middleware';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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


    // Cấu hình Swagger
    const config = new DocumentBuilder()
        .setTitle('Student Management API')
        .setDescription('API documentation for Student Management System')
        .setVersion('1.0')
        .addBearerAuth() // Nếu có authentication
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document); // Swagger UI sẽ có ở /api-docs

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
