import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
// Models
import mysqlConfiguration from './config/mysql-configuration';
import redisConfiguration from './config/redis.configuration';
import envValidation from './config/env.validation';
// Modules
import { DepartmentModule } from './modules/department/department.module';
import { StudentModule } from './modules/student/student.module';
import { SubjectModule } from './modules/subject/subject.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
//Others
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationListener } from './listeners/notification.listener';
import { BullModule } from '@nestjs/bullmq';


@Module({
    imports: [
        EventEmitterModule.forRoot(),
        StudentModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [mysqlConfiguration, redisConfiguration],
            validationSchema: envValidation
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const mysqlConfig = configService.get('mysql');
                return {
                    type: mysqlConfig.type,
                    host: mysqlConfig.host,
                    port: mysqlConfig.port,
                    username: mysqlConfig.username,
                    password: mysqlConfig.password,
                    database: mysqlConfig.database,
                    synchronize: mysqlConfig.synchronize,
                    autoLoadEntities: mysqlConfig.autoLoadEntities
                };
            }
        }),
        BullModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const redisConfig = configService.get('redis');
                return {
                    connection: {
                        host: redisConfig.host,
                        port: redisConfig.port
                    }
                };
            }
        }),
        // Custom Modules
        DepartmentModule,
        SubjectModule,
        TeacherModule,
        AuthModule,
        UserModule,
        RoleModule,
    ],
    controllers: [AppController],
    providers: [AppService, NotificationListener],
})
export class AppModule { }
