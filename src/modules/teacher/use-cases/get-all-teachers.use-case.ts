import { Inject, Injectable } from "@nestjs/common";
import { ITeacherRepository, TEACHER_REPOSITORY } from "../interface/teacher.repository.interface";
import { GetTeacherQueryDto } from "../dtos/get-teacher-query.dto";
import { Like } from "typeorm";

@Injectable()
export class GetAllTeachersUseCase {
    constructor(
        @Inject(TEACHER_REPOSITORY)
        private readonly teacherRepository: ITeacherRepository
    ) { }

    async execute(query: GetTeacherQueryDto) {
        return this.teacherRepository.findAll(
            query.limit * (query.page - 1),
            query.limit,
            ['departments'],
            {
                lastName: Like(`%${query.lastName}%`) // ILIKE '%value%' (case-insensitive)
            }
        );
    }
}