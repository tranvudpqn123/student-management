import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/repository/base.repository";
import { Teacher } from "./teacher.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TeacherRepository extends BaseRepository<Teacher> {
    constructor(
        @InjectRepository(Teacher)
        private readonly teacherRepository: Repository<Teacher>
    ) {
        super(teacherRepository);
    }
}