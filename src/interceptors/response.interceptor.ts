import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const res = context.switchToHttp().getResponse();
        const statusCode = res.statusCode;
        console.log('Response Interceptor:', { statusCode, statusMessage: res.statusMessage });

        
        return next.handle()
        .pipe(
            map(data => {
                console.log('Response Interceptor:', data);
                const dataResponse = {
                    data: data,
                    statusCode: statusCode,
                    statusMessage: res.statusMessage,
                };
                return dataResponse;
            })
        );
    }
}