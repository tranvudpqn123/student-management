import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ITeacherRepository, TEACHER_REPOSITORY } from "../interface/teacher.repository.interface";
import { ERROR_MESSAGES } from "src/constants/error-message";

@Injectable()
export class DeleteTeacherUseCase {
    constructor(
        @Inject(TEACHER_REPOSITORY)
        private readonly teacherRepository: ITeacherRepository
    ) { }

    async execute(id: string) {
        const deletedTeacher = await this.teacherRepository.findById(id);
        if (!deletedTeacher) {
            throw new BadRequestException(ERROR_MESSAGES.NOT_FOUND_BY_ID('Teacher', id));
        }
        await this.teacherRepository.delete(id);
        return deletedTeacher;
    }
}