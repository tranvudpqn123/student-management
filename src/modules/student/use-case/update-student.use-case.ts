import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IStudentRepository, STUDENT_REPOSITORY } from "../interfaces/student.repository.interface";
import { UpdateStudentDto } from "../dtos/update-student.dto";
import { StudentUtilityUseCase } from "./student-utility.use-case";
import { ERROR_MESSAGES } from "src/constants/error-message";

@Injectable()
export class UpdateStudentUseCase {
 
    constructor(
        private readonly studentUtility: StudentUtilityUseCase,
        @Inject(STUDENT_REPOSITORY)
        private readonly studentRepository: IStudentRepository
    ) {}

    async execute(id: string, student: UpdateStudentDto) {
        const udpatedStudent = await this.studentUtility.getStudentById(id);
        if (!udpatedStudent) {
            throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND_BY_ID(id, 'Student'));
        }

        let existingStudent;
        if (student.email) {
            existingStudent = await this.studentUtility.getStudentByEmail(student.email);
        }

        if (existingStudent && existingStudent.id !== id) {
            throw new BadRequestException(ERROR_MESSAGES.ALREADY_EXISTS_EMAIL(existingStudent.email, 'Student'));
        }

        Object.assign(udpatedStudent, student);
        await this.studentRepository.update(udpatedStudent.id, udpatedStudent);

        return udpatedStudent;
    }
}