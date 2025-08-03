import { Request, Response, NextFunction } from 'express';

export function ResponseLoggerMiddleware(req: Request, res: Response, next: NextFunction) {
    // Lưu phương thức json gốc
    const originalJson = res.json;
    
    // Override phương thức json
    res.json = function(body: any) {
        const dataMessage = {
            statusCode: res.statusCode,
            statusMessage: res.statusMessage,
            data: body
        };        
        // Gọi phương thức json gốc
        return originalJson.call(this, dataMessage);
    };
    next();
}