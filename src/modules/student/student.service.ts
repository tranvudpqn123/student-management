import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { NotFoundException } from './exceptions/not-found.exception';
import { ERROR_MESSAGES } from 'src/constants/error-message';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { DepartmentService } from '../department/department.service';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
        private readonly departmentService: DepartmentService
    ) {}

    async getAllStudents(): Promise<Student[]> {
        return await this.studentRepository.find();
    }

    getStudent(id: string) {
        const student = this.getStudentById(id);
        if (!student) {
            throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND_BY_ID(id, 'Student'));
        }
        return student;
    }

    async createStudent(student: CreateStudentDto) {
        const existingStudent = await this.getStudentByEmail(student.email);

        if (existingStudent) {
            throw new BadRequestException(ERROR_MESSAGES.ALREADY_EXISTS_EMAIL(existingStudent.email, 'Student'));
        }

        const existingDepartment = await this.departmentService.getDepartmentById(student.departmentId);
        if (!existingDepartment) {
            throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND_BY_ID(student.departmentId, 'Department'));
        }

        const newStudent = this.studentRepository.create(student);
        await this.studentRepository.save(newStudent);

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
        await this.studentRepository.save(udpatedStudent);

        return udpatedStudent;
    }

    async deleteStudent(id: string) {
        const deletedStudent = await this.getStudentById(id);
        if (deletedStudent) {
            await this.studentRepository.remove(deletedStudent);
            return deletedStudent;
        }
        
        throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND_BY_ID(id, 'Student'));
    }

    private async getStudentById(id: string): Promise<Student | null> {
        return await this.studentRepository.findOne({ 
            where: { id },
            relations: ['department'] // Include department relation if needed
        });
    }

    private async getStudentByEmail(email: string): Promise<Student | null> {
        return await this.studentRepository.findOne({ 
            where: { email },
        });
    }

}
