import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UseFilters } from '@nestjs/common';
import { StudentService } from './student.service';
import { IStudent } from './student.interface';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { CustomParsePipeInt } from './custom-parse-int.pipe';
import { ForbiddenException } from './exceptions/forbiden.exception';

@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}
    
    @Get()
    getAllStudents(): IStudent[] {
        return this.studentService.getAllStudents();
    }

    @Get(':id')
    getStudent(@Param('id', ParseIntPipe) id: number): IStudent {
        return this.studentService.getStudent(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createStudent(@Body() student: CreateStudentDto) {
        return this.studentService.createStudent(student);
    }

    @Put(':id')
    updateStudent(@Param('id', ParseIntPipe) id: number, @Body() student: UpdateStudentDto) {
        return this.studentService.updateStudent(id, student);
    }

    @Delete(':id')
    deleteStudent(@Param('id', CustomParsePipeInt) id: number) {
        return this.studentService.deleteStudent(id);
    }
}
