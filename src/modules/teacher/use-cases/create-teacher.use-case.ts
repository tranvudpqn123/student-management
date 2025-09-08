import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ITeacherRepository, TEACHER_REPOSITORY } from "../interface/teacher.repository.interface";
import { CreateTeacherDto } from "../dtos/create-teacher.dto";
import { ERROR_MESSAGES } from "src/constants/error-message";
import { Department } from "src/modules/department/department.entity";
import { DepartmentService } from "src/modules/department/department.service";

@Injectable()
export class CreateTeacherUseCase {
    constructor(
        @Inject(TEACHER_REPOSITORY)
        private readonly teacherRepository: ITeacherRepository,
        private readonly departmentService: DepartmentService
    ) { }

    async execute(createTeacherDto: CreateTeacherDto) {
        const teacherExists = await this.teacherRepository.findOneBy({ email: createTeacherDto.email });
        if (teacherExists) {
            throw new BadRequestException(ERROR_MESSAGES.ALREADY_EXISTS_EMAIL(teacherExists.email, 'Teacher'));
        }

        let departments: Department[] = [];
        if (createTeacherDto.departmentIds && createTeacherDto.departmentIds.length > 0) {
            departments = await this.departmentService.getDepartmentByIds(createTeacherDto.departmentIds);
        }

        return this.teacherRepository.create({
            ...createTeacherDto,
            departments
        });
    }
}