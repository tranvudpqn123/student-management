import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Inject, Logger } from "@nestjs/common";
import { Request, Response } from 'express';
import { EHEADER_KEY } from "src/common/enums/header-key.enum";

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
        const requestId = request.headers[EHEADER_KEY.REQUEST_ID] || '';

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
        response
            .status(status)
            .json({
                ...exception.getResponse(),
                requestId
            });

    }
}