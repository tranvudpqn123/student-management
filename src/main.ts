import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ResponseLoggerMiddleware } from './middlewares/response.middleware';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { connect } from 'http2';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import helmet from 'helmet';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(helmet());
    app.enableCors(
        {
            origin: 'https://your-frontend-domain.com', // thay bằng domain FE thực tế
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
        }
    );
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    // app.useGlobalFilters(new HttpExceptionFilter());
    // app.use(LoggerMiddleware);
    // app.use(ResponseLoggerMiddleware)

    app.useGlobalInterceptors(new ResponseInterceptor())


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
