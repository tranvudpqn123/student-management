import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Res } from '@nestjs/common';
import { StudentService } from './student.service';
import { IStudent } from './student.interface';
import { Response } from 'express';
import { CreateStudentDto } from './dtos/create-student.dto';

@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}
    
    @Get()
    getAllStudents(): IStudent[] {
        return this.studentService.getAllStudents();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createStudent(@Body() student: CreateStudentDto) {
        this.studentService.createStudent(student);
    }

    @Put()
    updateStudent() {
        return 'This action updates a student';
    }

    @Delete()
    deleteStudent() {
        return 'This action deletes a student';
    }
}
