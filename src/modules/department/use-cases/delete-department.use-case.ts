import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DEPARTMENT_REPOSITORY, IDepartmentRepository } from "../interfaces/department.repository.interface";
import { ERROR_MESSAGES } from "src/constants/error-message";

@Injectable()
export class DeleteDepartmentUseCase {
    constructor(
        @Inject(DEPARTMENT_REPOSITORY)
        private readonly departmentRepository: IDepartmentRepository
    ) { }

    async execute(id: string) {
        const department = await this.departmentRepository.findOneBy({ id });
        if (department) {
            await this.departmentRepository.delete(id);
            return department;
        }

        throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND_BY_ID(id, 'Department'));
    }
}