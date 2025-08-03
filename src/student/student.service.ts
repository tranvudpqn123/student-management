import { BadRequestException, Injectable } from '@nestjs/common';
import { IStudent } from './student.interface';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { NotFoundException } from './exceptions/not-found.exception';
import { ERROR_MESSAGES } from 'src/constants/error-message';

@Injectable()
export class StudentService {
    students: IStudent[] = [
        { id: 1, name: 'John Doe', age: 20, major: 'Computer Science', email: 'john.doe@example.com' },
        { id: 2, name: 'Jane Smith', age: 22, major: 'Mathematics', email: 'jane.smith@example.com' },
        { id: 3, name: 'Alice Johnson', age: 21, major: 'Physics', email: 'alice.johnson@example.com' },
    ];

    getAllStudents(): IStudent[] {
        return this.students;
    }

    getStudent(id: number): IStudent {
        const student = this.getStudentById(id);
        if (!student) {
            throw new NotFoundException(ERROR_MESSAGES.STUDENT_NOT_FOUND_BY_ID(id, 'Student'));
        }
        return student;
    }

    createStudent(student: CreateStudentDto) {
        const existingStudent = this.getStudentByEmail(student.email);
        if (existingStudent) {
            throw new BadRequestException(ERROR_MESSAGES.STUDENT_ALREADY_EXISTS_EMAIL(existingStudent.email, 'Student'));
        }

        const newStudent = {
            id: Math.floor(Math.random() * 1000),
            ...student
        };
        this.students.push(newStudent);

        return newStudent;
    }

    updateStudent(id: number, student: UpdateStudentDto) {
        const index = this.getStudentIndexById(id);
        let existingStudent;
        if (student.email) {
            existingStudent = this.getStudentByEmail(student.email);
        }

        if (existingStudent && existingStudent.id !== id) {
            throw new BadRequestException(ERROR_MESSAGES.STUDENT_ALREADY_EXISTS_EMAIL(existingStudent.email, 'Student'));
        }

        if (index !== -1) {
            this.students[index] = { ...this.students[index], ...student };
            return this.students[index];
        }
        throw new NotFoundException(ERROR_MESSAGES.STUDENT_NOT_FOUND_BY_ID(id, 'Student'));
    }

    deleteStudent(id: number) {
        const index = this.getStudentIndexById(id);
        if (index !== -1) {
            const deletedStudent = this.students[index];
            this.students.splice(index, 1);
            return deletedStudent;
        }
        
        throw new NotFoundException(ERROR_MESSAGES.STUDENT_NOT_FOUND_BY_ID(id, 'Student'));
    }

    private getStudentIndexById(id: number): number {
        return this.students.findIndex(s => s.id === id);
    }

    private getStudentById(id: number): IStudent | undefined {
        return this.students.find(s => s.id === id);
    }

    private getStudentByEmail(email: string): IStudent | undefined {
        return this.students.find(s => s.email === email);
    }

}
