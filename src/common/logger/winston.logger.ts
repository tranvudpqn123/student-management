import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

export const winstonLoggerOptions: winston.LoggerOptions = {
    transports: [
        // Ghi log ra console
        // new winston.transports.Console({
        //     format: winston.format.combine(
        //         // Thêm timestamp vào log
        //         winston.format.timestamp(), 
        //         // Định dạng log theo phong cách của NestJS, tên app là 'StudentManagement'
        //         nestWinstonModuleUtilities.format.nestLike('StudentManagement', { prettyPrint: true })
        //     )
        // }),
        // Ghi log ra file
        new winston.transports.File({
            // đường dẫn
            filename: 'logs/app.log',
            format: winston.format.combine(
                // thêm timestamp vào log
                winston.format.timestamp(),
                // định dạng log dưới dạng JSON
                winston.format.json(),
            ),
        }),
    ]
}