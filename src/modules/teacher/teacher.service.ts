import { Injectable } from "@nestjs/common";
import { CreateTeacherDto } from "./dtos/create-teacher.dto";
import { GetTeacherQueryDto } from "./dtos/get-teacher-query.dto";
import { CreateTeacherUseCase } from "./use-cases/create-teacher.use-case";
import { DeleteTeacherUseCase } from "./use-cases/delete-teacher.use-case";
import { GetAllTeachersUseCase } from "./use-cases/get-all-teachers.use-case";

@Injectable()
export class TeacherService {

    constructor(
        private readonly createTeacherUseCase: CreateTeacherUseCase,
        private readonly deleteTeacherUseCase: DeleteTeacherUseCase,
        private readonly getAllTeachersUseCase: GetAllTeachersUseCase
    ) {}

    async createTeacher(createTeacherDto: CreateTeacherDto) {
        return this.createTeacherUseCase.execute(createTeacherDto);
    }

    async getTeachers(query: GetTeacherQueryDto) {
        return this.getAllTeachersUseCase.execute(query);
    }

    async deleteTeacher(id: string) {
        return this.deleteTeacherUseCase.execute(id);
    }

}