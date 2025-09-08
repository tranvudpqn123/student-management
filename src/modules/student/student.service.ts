import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { GetStudentQueryDto } from './dtos/get-student-query.dto';
import { IUserAuthentication } from 'src/models/user-authentication.interface';
import { CreateStudentUseCase } from './use-case/create-student.use-case';
import { UpdateStudentUseCase } from './use-case/update-student.use-case';
import { DeleteStudentUseCase } from './use-case/delete-student.use-case';
import { GetStudentDetailUseCase } from './use-case/get-student-detail.use-case';
import { GetAllStudentUseCase } from './use-case/get-all-student.use-case';

@Injectable()
export class StudentService {
    constructor(
        private readonly createStudentUseCase: CreateStudentUseCase,
        private readonly updateStudentUseCase: UpdateStudentUseCase,  
        private readonly deleteStudentUseCase: DeleteStudentUseCase,  
        private readonly getStudentDetailUseCase: GetStudentDetailUseCase,
        private readonly getAllStudentUseCase: GetAllStudentUseCase
    ) {}

    async getAllStudents(query: GetStudentQueryDto, user: IUserAuthentication) {
        return await this.getAllStudentUseCase.execute(query, user);
    }

    async getStudent(id: string) {
        return await this.getStudentDetailUseCase.execute(id);
    }

    async createStudent(userId: string, student: CreateStudentDto) {
        return await this.createStudentUseCase.execute(userId, student);
    }

    async updateStudent(id: string, student: UpdateStudentDto) {
        return await this.updateStudentUseCase.execute(id, student);
    }

    async deleteStudent(id: string) {
        return await this.deleteStudentUseCase.execute(id);
    }

}
