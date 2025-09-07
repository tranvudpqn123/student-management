import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { ERROR_MESSAGES } from 'src/constants/error-message';
import { UpdateDepartmentDto } from './dtos/update-department.dto';
import { DEPARTMENT_REPOSITORY, IDepartmentRepository } from './interfaces/department.repository.interface';

@Injectable()
export class DepartmentService {
    constructor(
        @Inject(DEPARTMENT_REPOSITORY)
        private readonly departmentRepository: IDepartmentRepository
    ) {}

    async createDepartment(department: CreateDepartmentDto) {
        const departmentExists = await this.departmentRepository.findOneBy({ name: department.name });
        if (departmentExists) {
            throw new BadRequestException(ERROR_MESSAGES.ALREADY_EXISTS('Department', department.name));
        }
        return await this.departmentRepository.create(department);
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
        const existingDepartment = await this.departmentRepository.findOneBy({ id });
        if (!existingDepartment) {
            throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND_BY_ID(id, 'Department'));
        }
        Object.assign(existingDepartment, department);

        return await this.departmentRepository.update(id, existingDepartment);
    }

    async deleteDepartment(id: string) {
        const department = await this.departmentRepository.findOneBy({ id });
        if (department) {
            await this.departmentRepository.delete(id);
            return department;
        }

        throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND_BY_ID(id, 'Department'));
    }
}
