import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IStudentRepository, STUDENT_REPOSITORY } from "../interfaces/student.repository.interface";
import { CreateStudentDto } from "../dtos/create-student.dto";
import { UserService } from "src/modules/user/user.service";
import { StudentUtilityUseCase } from "./student-utility.use-case";
import { ERROR_MESSAGES } from "src/constants/error-message";
import { DepartmentService } from "src/modules/department/department.service";
import { GetStudentQueryDto } from "../dtos/get-student-query.dto";
import { IUserAuthentication } from "src/models/user-authentication.interface";

@Injectable()
export class GetAllStudentsUseCase {

    constructor(
        private readonly departmentService: DepartmentService,        
        @Inject(STUDENT_REPOSITORY)
        private readonly studentRepository: IStudentRepository,
        private readonly userService: UserService,
        private readonly studentUtility: StudentUtilityUseCase
    ) { }

    async execute(query: GetStudentQueryDto, user: IUserAuthentication) {
        const condition: any = {
            departmentId: query.departmentId
        };

        if (user.role === 'USER') {
            condition.createdBy = {id: user.id};
        }

        return await this.studentRepository.findAll(
            query.limit * (query.page - 1),
            query.limit,
            [], // Include department relation if needed
            condition
        );
    }
}