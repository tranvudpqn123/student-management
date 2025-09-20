import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Request, Response } from "express";
import { Observable } from "rxjs";
import { randomUUID } from "crypto";
import { EHEADER_KEY } from "src/common/enums/header-key.enum";

@Injectable()
export class GenerateRequestIdInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const ctx = context.switchToHttp();
        const request: Request = ctx.getRequest();
        const response: Response = ctx.getResponse();

        // Gắn requestId vào header của request và response
        const requestId = request.headers[EHEADER_KEY.REQUEST_ID] || randomUUID();
        request.headers[EHEADER_KEY.REQUEST_ID] = requestId;

        response.setHeader(EHEADER_KEY.REQUEST_ID, requestId);

        return next.handle();

    }
}