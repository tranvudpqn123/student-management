import { BaseRepository } from "src/repository/base.repository";
import { Student } from "./student.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { IStudentRepository } from "./interfaces/student.repository.interface";

@Injectable()
export class StudentRepository extends BaseRepository<Student> implements IStudentRepository {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>
    ) {
        super(studentRepository);
    }

}