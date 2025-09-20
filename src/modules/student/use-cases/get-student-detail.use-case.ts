import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { StudentUtilityUseCase } from "./student-utility.use-case";
import { ERROR_MESSAGES } from "src/constants/error-message";

@Injectable()
export class GetStudentDetailUseCase {
    constructor(
        private readonly studentUtility: StudentUtilityUseCase
    ) { }

    async execute(id: string) {
        const student = await this.studentUtility.getStudentById(id);
        console.log('student: ', student)
        if (!student) {
            throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND_BY_ID(id, 'Student'));
        }
        return student;
    }

    
}