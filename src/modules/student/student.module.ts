import { Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "./student.entity";
import { DepartmentModule } from "../department/department.module";


@Module({
    controllers: [StudentController],
    providers: [StudentService],
    imports: [
        TypeOrmModule.forFeature([Student]),
        DepartmentModule
    ]
})
export class StudentModule {
}