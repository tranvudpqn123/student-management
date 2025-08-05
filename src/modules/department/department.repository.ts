import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/repository/base.repository";
import { Department } from "./department.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class DepartmentRepository extends BaseRepository<Department> {

    constructor(
        @InjectRepository(Department)
        private readonly departmentRepository: Repository<Department>
    ) {
        super(departmentRepository);
    }
}