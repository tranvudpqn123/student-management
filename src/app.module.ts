import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { ConfigModule } from '@nestjs/config';
import mysqlConfiguration from './config/mysql-configuration';
import envValidation from './config/env.validation';


@Module({
    imports: [
        StudentModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [mysqlConfiguration],
            validationSchema: envValidation
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
