import { Inject, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { UpdateDepartmentDto } from './dtos/update-department.dto';
import { DEPARTMENT_REPOSITORY, IDepartmentRepository } from './interfaces/department.repository.interface';
import { CreateDepartmentUseCase } from './use-cases/create-department.use-case';
import { UpdateDepartmentUseCase } from './use-cases/update-department.use-case';
import { DeleteDepartmentUseCase } from './use-cases/delete-department.use-case';

@Injectable()
export class DepartmentService {
    constructor(
        @Inject(DEPARTMENT_REPOSITORY)
        private readonly departmentRepository: IDepartmentRepository,
        private readonly createDepartmentUseCase: CreateDepartmentUseCase,
        private readonly updateDepartmentUseCase: UpdateDepartmentUseCase,
        private readonly deleteDepartmentUseCase: DeleteDepartmentUseCase
    ) {}

    async createDepartment(department: CreateDepartmentDto) {
        return this.createDepartmentUseCase.execute(department);
    }

    async getDepartmentByIds(ids: string[]) {
        const departments = await this.departmentRepository.findByIds(ids);
        return departments;
    }

    async findAllDepartments() {
        return await this.departmentRepository.findAll(
            0, // skip
            100, // take
            [], // relations
            null // where
        );
    }

    async getDepartmentById(id: string) {
        return await this.departmentRepository.findOneBy({ id });
    }

    async updateDepartment(id: string, department: UpdateDepartmentDto) {
        return this.updateDepartmentUseCase.execute(id, department);
    }

    async deleteDepartment(id: string) {
        return this.deleteDepartmentUseCase.execute(id);
    }
}
