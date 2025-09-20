import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { WinstonModule } from 'nest-winston';
import { BullModule } from '@nestjs/bullmq';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
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
// Interceptors
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { GenerateRequestIdInterceptor } from './interceptors/generate-request-id.interceptor';
//Others
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationListener } from './listeners/notification.listener';
import { winstonLoggerOptions } from './common/logger/winston.logger';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ThrottlerModule } from '@nestjs/throttler';




@Module({
    imports: [
        EventEmitterModule.forRoot(),
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
        CacheModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const redisConfig = configService.get('redis');
                return {
                    isGlobal: true,
                    ttl: 60, // seconds
                    max: 10, // maximum number of items in cache
                    store: 'redis',
                    host: redisConfig.host,
                    port: redisConfig.port
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
        WinstonModule.forRoot(winstonLoggerOptions),
        ThrottlerModule.forRoot({
            throttlers: [
                {
                    ttl: 60000,
                    limit: 10,
                },
            ],
        }),
        // Custom Modules
        StudentModule,
        DepartmentModule,
        SubjectModule,
        TeacherModule,
        AuthModule,
        UserModule,
        RoleModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        NotificationListener,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: GenerateRequestIdInterceptor
        }
    ],
})
export class AppModule { }
