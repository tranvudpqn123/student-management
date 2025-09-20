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
import { CreateStudentUseCase } from "./use-cases/create-student.use-case";
import { StudentUtilityUseCase } from "./use-cases/student-utility.use-case";
import { UpdateStudentUseCase } from "./use-cases/update-student.use-case";
import { DeleteStudentUseCase } from "./use-cases/delete-student.use-case";
import { GetStudentDetailUseCase } from "./use-cases/get-student-detail.use-case";
import { GetAllStudentsUseCase } from "./use-cases/get-all-students.use-case";
import { UpdateImageUseCase } from "./use-cases/upload-image.use-case";
import { StudentEventsListener } from "./student.event-listener";
import { BullModule } from "@nestjs/bullmq";
import { ImageProcessingService } from './image-processing.service';
import { QUEUE_NAME } from "src/common/enums/queue-name.enum";
import { CacheModule } from "@nestjs/cache-manager";

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
        GetAllStudentsUseCase,
        StudentUtilityUseCase,
        UpdateImageUseCase,
        StudentService,
        StudentEventsListener,
        JwtStrategyProvider,
        ImageProcessingService,       
    ],
    imports: [
        PassportModule,
        CacheModule.register(), // hoặc CacheModule nếu đã global
        
        BullModule.registerQueue({
            name: QUEUE_NAME.IMAGE_OPTIMIZE,
            prefix: 'student'
        }),
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