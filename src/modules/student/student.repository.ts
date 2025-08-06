import { BaseRepository } from "src/repository/base.repository";
import { Student } from "./student.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class StudentRepository extends BaseRepository<Student> {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>
    ) {
        super(studentRepository);
    }

}