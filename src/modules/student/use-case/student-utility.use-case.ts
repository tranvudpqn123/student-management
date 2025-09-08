import { Inject, Injectable } from "@nestjs/common";
import { Student } from "../student.entity";
import { IStudentRepository, STUDENT_REPOSITORY } from "../interfaces/student.repository.interface";

@Injectable()
export class StudentUtilityUseCase {
    constructor(
        @Inject(STUDENT_REPOSITORY)
        private readonly studentRepository: IStudentRepository,
    ) {}

    async getStudentByEmail(email: string): Promise<Student | null> {
        return await this.studentRepository.findOneBy({ email });
    }

    async getStudentById(id: string): Promise<Student | null> {
        return await this.studentRepository.findOneBy({id});
    }
}