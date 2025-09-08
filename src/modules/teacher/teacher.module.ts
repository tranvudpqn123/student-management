import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { TeacherService } from './teacher.service';
import { TeacherRepository } from './teacher.repository';
import { DepartmentModule } from '../department/department.module';
import { TEACHER_REPOSITORY } from './interface/teacher.repository.interface';
import { CreateTeacherUseCase } from './use-cases/create-teacher.use-case';
import { DeleteTeacherUseCase } from './use-cases/delete-teacher.use-case';
import { GetAllTeachersUseCase } from './use-cases/get-all-teachers.use-case';

@Module({
    providers: [
        TeacherService, 
        CreateTeacherUseCase,
        DeleteTeacherUseCase,
        GetAllTeachersUseCase,
        {
            provide: TEACHER_REPOSITORY,
            useClass: TeacherRepository
        }
    ],
    controllers: [TeacherController],
    imports: [
        TypeOrmModule.forFeature([Teacher]),
        DepartmentModule
    ]
})
export class TeacherModule {}
