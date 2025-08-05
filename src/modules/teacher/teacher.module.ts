import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { TeacherService } from './teacher.service';
import { TeacherRepository } from './teacher.repository';
import { DepartmentModule } from '../department/department.module';

@Module({
    providers: [TeacherService, TeacherRepository],
    controllers: [TeacherController],
    imports: [
        TypeOrmModule.forFeature([Teacher]),
        DepartmentModule
    ]
})
export class TeacherModule {}
