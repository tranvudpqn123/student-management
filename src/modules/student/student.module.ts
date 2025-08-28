import { Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "./student.entity";
import { DepartmentModule } from "../department/department.module";
import { StudentRepository } from "./student.repository";
import { JwtStrategyProvider } from "src/providers/jwt-strategy.provider";
import { AuthGuard, PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";

@Module({
    controllers: [StudentController],
    providers: [
        StudentService,
        StudentRepository,
        JwtStrategyProvider,
        {
            provide: APP_GUARD,
            useClass: AuthGuard('jwt')
        }
    ],
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_TOKEN_SECRET,
            signOptions: { expiresIn: process.env.JWT_TOKEN_EXPIRATION },
        }),
        TypeOrmModule.forFeature([Student]),
        DepartmentModule
    ]
})
export class StudentModule {
}