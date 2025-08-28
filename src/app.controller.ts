import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

interface MySqlConfiguration {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    autoLoadEntities: boolean;
}

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly configService: ConfigService
    ) { }

    @Get()
    getHello(): string {
        const mysqlConfig = this.configService.get<MySqlConfiguration>('mysql');
        return this.appService.getHello();
    }
}
