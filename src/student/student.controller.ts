import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { StudentService } from './student.service';
import { IStudent } from './student.interface';
import { Response } from 'express';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';

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

    @Put(':id')
    updateStudent(@Param('id') id: number, @Body() student: UpdateStudentDto) {
        return this.studentService.updateStudent(id, student);
    }

    @Delete(':id')
    deleteStudent(@Param('id') id: number) {
        return this.studentService.deleteStudent(id);
    }
}
