import { Injectable } from '@nestjs/common';
import { IStudent } from './student.interface';
import { CreateStudentDto } from './dtos/create-student.dto';

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
}
