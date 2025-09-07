import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { TeacherService } from './teacher.service';
import { TeacherRepository } from './teacher.repository';
import { DepartmentModule } from '../department/department.module';
import { TEACHER_REPOSITORY } from './interface/teacher.repository.interface';

@Module({
    providers: [
        TeacherService, 
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
