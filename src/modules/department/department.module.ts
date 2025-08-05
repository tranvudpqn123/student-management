import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { DepartmentRepository } from './department.repository';

@Module({
    controllers: [DepartmentController],
    providers: [DepartmentService, DepartmentRepository],
    imports: [
        TypeOrmModule.forFeature([Department]),
    ],
    exports: [DepartmentService]
})
export class DepartmentModule { }
