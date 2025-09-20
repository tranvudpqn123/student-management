import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Inject, Logger } from "@nestjs/common";
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(@Inject('winston') private readonly logger: Logger,) {
    }


    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const message = exception.message;
        const stack = exception.stack;
        const requestId = request.headers['x-request-id'] || '';

        if ([400, 404, 500].includes(status)) {
            const logData = {
                status,
                method: request.method,
                url: request.url,
                params: request.params,
                query: request.query,
                body: request.body,
                message,
                requestId,
                stack,
                timestamp: new Date().toISOString(),                
            };
            this.logger.error(logData);
        }

        // Trả về response mặc định của NestJS
        response
            .status(status)
            .json(exception.getResponse());

    }
}