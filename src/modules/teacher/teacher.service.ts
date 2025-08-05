import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateTeacherDto } from "./dtos/create-teacher.dto";
import { TeacherRepository } from "./teacher.repository";
import { ERROR_MESSAGES } from "src/constants/error-message";
import { Department } from "../department/department.entity";
import { DepartmentService } from "../department/department.service";

@Injectable()
export class TeacherService {

    constructor(
        private readonly teacherRepository: TeacherRepository,
        private readonly departmentService: DepartmentService
    ) {}

    async createTeacher(createTeacherDto: CreateTeacherDto) {
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

    async getTeachers() {
        return this.teacherRepository.findAll(['departments']);
    }

    async deleteTeacher(id: string) {
        const deletedTeacher = await this.teacherRepository.findById(id);
        if (!deletedTeacher) {
            throw new BadRequestException(ERROR_MESSAGES.NOT_FOUND_BY_ID('Teacher', id));
        }
        await this.teacherRepository.delete(id);
        return deletedTeacher;
    }

}