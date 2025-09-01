import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mysqlConfiguration from './config/mysql-configuration';
import envValidation from './config/env.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentModule } from './modules/department/department.module';
import { StudentModule } from './modules/student/student.module';
import { SubjectModule } from './modules/subject/subject.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';

@Module({
    imports: [
        StudentModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [mysqlConfiguration],
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
        DepartmentModule,
        SubjectModule,
        TeacherModule,
        AuthModule,
        UserModule,
        RoleModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
