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
import { CreateStudentUseCase } from "./use-case/create-student.use-case";
import { StudentUtilityUseCase } from "./use-case/student-utility.use-case";
import { UpdateStudentUseCase } from "./use-case/update-student.use-case";
import { DeleteStudentUseCase } from "./use-case/delete-student.use-case";
import { GetStudentDetailUseCase } from "./use-case/get-student-detail.use-case";
import { GetAllStudentUseCase } from "./use-case/get-all-student.use-case";

@Module({
    controllers: [StudentController],
    providers: [
        {
            provide: STUDENT_REPOSITORY ,
            useClass: StudentRepository
        },
        CreateStudentUseCase,
        UpdateStudentUseCase,
        DeleteStudentUseCase,
        GetStudentDetailUseCase,
        GetAllStudentUseCase,
        StudentUtilityUseCase,
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