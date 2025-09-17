import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { Logger } from "winston";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(
        @Inject('winston') private readonly logger: Logger // Sửa lại cách inject
    ){}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const { method, url, body } = req;
        const now = Date.now();

        return next.handle().pipe(
            tap(() => {
                const res = context.switchToHttp().getResponse();
                const statusCode = res.statusCode;
                const time = Date.now() - now;

                let logMessage = `${method} ${url} ${statusCode} - ${time}ms`;
                if (method === 'POST' || method === 'PUT') {
                    logMessage += ` - body: ${JSON.stringify(body)}`;
                };
                this.logger.info(logMessage);
            }),
        );
    }
}