import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { NotFoundException } from './exceptions/not-found.exception';
import { ERROR_MESSAGES } from 'src/constants/error-message';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { DepartmentService } from '../department/department.service';
import { GetStudentQueryDto } from './dtos/get-student-query.dto';
import { StudentRepository } from './student.repository';
import { UserService } from '../user/user.service';
import { IUserAuthentication } from 'src/models/user-authentication.interface';
import { IStudentRepository, STUDENT_REPOSITORY } from './interfaces/student.repository.interface';

@Injectable()
export class StudentService {
    constructor(
        private readonly departmentService: DepartmentService,
        @Inject(STUDENT_REPOSITORY)
        private readonly studentRepository: IStudentRepository,
        private readonly userService: UserService
    ) {}

    async getAllStudents(query: GetStudentQueryDto, user: IUserAuthentication) {
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

    getStudent(id: string) {
        const student = this.getStudentById(id);
        if (!student) {
            throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND_BY_ID(id, 'Student'));
        }
        return student;
    }

    async createStudent(userId: string, student: CreateStudentDto) {
        const existingUser = await this.userService.getUserDetail(userId);

        const existingStudent = await this.getStudentByEmail(student.email);

        if (existingStudent) {
            throw new BadRequestException(ERROR_MESSAGES.ALREADY_EXISTS_EMAIL(existingStudent.email, 'Student'));
        }

        const existingDepartment = await this.departmentService.getDepartmentById(student.departmentId);
        if (!existingDepartment) {
            throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND_BY_ID(student.departmentId, 'Department'));
        }

        const newStudent = this.studentRepository.create({
            ...student,
            createdBy: existingUser
        });

        return newStudent;
    }

    async updateStudent(id: string, student: UpdateStudentDto) {
        const udpatedStudent = await this.getStudentById(id);
        if (!udpatedStudent) {
            throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND_BY_ID(id, 'Student'));
        }

        let existingStudent;
        if (student.email) {
            existingStudent = await this.getStudentByEmail(student.email);
        }

        if (existingStudent && existingStudent.id !== id) {
            throw new BadRequestException(ERROR_MESSAGES.ALREADY_EXISTS_EMAIL(existingStudent.email, 'Student'));
        }

        Object.assign(udpatedStudent, student);
        await this.studentRepository.update(udpatedStudent.id, udpatedStudent);

        return udpatedStudent;
    }

    async deleteStudent(id: string) {
        const deletedStudent = await this.getStudentById(id);
        if (deletedStudent) {
            await this.studentRepository.delete(id);
            return deletedStudent;
        }
        
        throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND_BY_ID(id, 'Student'));
    }

    private async getStudentById(id: string): Promise<Student | null> {
        return await this.studentRepository.findOneBy({id});
    }

    private async getStudentByEmail(email: string): Promise<Student | null> {
        return await this.studentRepository.findOneBy({ email });
    }

}
