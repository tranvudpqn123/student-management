import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IStudentRepository, STUDENT_REPOSITORY } from "../interfaces/student.repository.interface";
import { CreateStudentDto } from "../dtos/create-student.dto";
import { UserService } from "src/modules/user/user.service";
import { StudentUtilityUseCase } from "./student-utility.use-case";
import { ERROR_MESSAGES } from "src/constants/error-message";
import { DepartmentService } from "src/modules/department/department.service";

@Injectable()
export class DeleteStudentUseCase {

    constructor(
        @Inject(STUDENT_REPOSITORY)
        private readonly studentRepository: IStudentRepository,
        private readonly studentUtility: StudentUtilityUseCase
    ) { }

    async execute(id: string) {
        const deletedStudent = await this.studentUtility.getStudentById(id);
        if (deletedStudent) {
            await this.studentRepository.delete(id);
            return deletedStudent;
        }
        
        throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND_BY_ID(id, 'Student'));
    }
}