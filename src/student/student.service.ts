import { Injectable } from '@nestjs/common';
import { IStudent } from './student.interface';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { NotFoundException } from './exceptions/not-found.exception';

@Injectable()
export class StudentService {
    students: IStudent[] = [
        { id: 1, name: 'John Doe', age: 20, major: 'Computer Science' },
        { id: 2, name: 'Jane Smith', age: 22, major: 'Mathematics' },
        { id: 3, name: 'Alice Johnson', age: 21, major: 'Physics' },
    ];

    getAllStudents(): IStudent[] {
        return this.students;
    }

    createStudent(student: CreateStudentDto) {
        const newStudent = {
            id: Math.random(),
            ...student
        };
        this.students.push(newStudent);
    }

    updateStudent(id: number, student: UpdateStudentDto) {
        const index = this.students.findIndex(s => s.id === id);
        if (index !== -1) {
            this.students[index] = { ...this.students[index], ...student };
            return this.students[index];
        }
        throw new NotFoundException();
    }

    deleteStudent(id: number) {
        const index = this.students.findIndex(s => s.id === id);
        if (index !== -1) {
            const deletedStudent = this.students[index];
            this.students.splice(index, 1);
            return deletedStudent;
        }
        
        throw new NotFoundException();
    }
}
