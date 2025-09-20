import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, of, tap } from "rxjs";
import { Cache } from 'cache-manager';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        const key = `${JSON.stringify(req.query)}`;
        const cached = await this.cacheManager.get(key);
        const result = typeof cached === 'string' ? JSON.parse(cached) : cached;

        if (result) {
            console.log(`data from cache: ${key}`, result);
            return of(result);
        }

        return next.handle().pipe(
            tap(async (data) => {
                console.log(`Caching response for key: ${key}, data: ${JSON.stringify(data)}`);
                await this.cacheManager.set(key, data, 3600); // TTL 60s
            }),
        );
    }
}