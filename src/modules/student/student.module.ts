import { Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "./student.entity";
import { DepartmentModule } from "../department/department.module";
import { StudentRepository } from "./student.repository";
import { JwtStrategyProvider } from "src/providers/jwt-strategy.provider";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { AuthModule } from "../auth/auth.module";
import { STUDENT_REPOSITORY  } from "./interfaces/student.repository.interface";

@Module({
    controllers: [StudentController],
    providers: [
        {
            provide: STUDENT_REPOSITORY ,
            useClass: StudentRepository
        },
        StudentService,
        JwtStrategyProvider,       
    ],
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_TOKEN_SECRET,
            signOptions: { expiresIn: process.env.JWT_TOKEN_EXPIRATION },
        }),
        TypeOrmModule.forFeature([Student]),
        DepartmentModule,
        UserModule,
        AuthModule
    ]
})
export class StudentModule {
}