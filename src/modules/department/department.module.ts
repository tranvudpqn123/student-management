import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { DepartmentRepository } from './department.repository';
import { DEPARTMENT_REPOSITORY } from './interfaces/department.repository.interface';
import { CreateDepartmentUseCase } from './use-cases/create-department.use-case';
import { UpdateDepartmentUseCase } from './use-cases/update-department.use-case';
import { DeleteDepartmentUseCase } from './use-cases/delete-department.use-case';

@Module({
    controllers: [DepartmentController],
    providers: [DepartmentService,
        CreateDepartmentUseCase, 
        UpdateDepartmentUseCase,
        DeleteDepartmentUseCase,
        {
            provide: DEPARTMENT_REPOSITORY,
            useClass: DepartmentRepository
        }
    ],
    imports: [
        TypeOrmModule.forFeature([Department]),
    ],
    exports: [DepartmentService]
})
export class DepartmentModule { }
