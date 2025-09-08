import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IStudentRepository, STUDENT_REPOSITORY } from "../interfaces/student.repository.interface";
import { CreateStudentDto } from "../dtos/create-student.dto";
import { UserService } from "src/modules/user/user.service";
import { StudentUtilityUseCase } from "./student-utility.use-case";
import { ERROR_MESSAGES } from "src/constants/error-message";
import { DepartmentService } from "src/modules/department/department.service";

@Injectable()
export class CreateStudentUseCase {

    constructor(
        private readonly departmentService: DepartmentService,        
        @Inject(STUDENT_REPOSITORY)
        private readonly studentRepository: IStudentRepository,
        private readonly userService: UserService,
        private readonly studentUtility: StudentUtilityUseCase
    ) { }

    async execute(userId: string, student: CreateStudentDto) {
        const existingUser = await this.userService.getUserDetail(userId);

        const existingStudent = await this.studentUtility.getStudentByEmail(student.email);

        if (existingStudent) {
            throw new BadRequestException(ERROR_MESSAGES.ALREADY_EXISTS_EMAIL(existingStudent.email, 'Student'));
        }

        const existingDepartment = await this.departmentService.getDepartmentById(student.departmentId);
        if (!existingDepartment) {
            throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND_BY_ID(student.departmentId, 'Department'));
        }

        const newStudent = this.studentRepository.create({
            ...student,
            createdBy: existingUser
        });

        return newStudent;
    }
}