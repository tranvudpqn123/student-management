import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UseFilters } from '@nestjs/common';
import { StudentService } from './student.service';
import { IStudent } from './student.interface';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { CustomParsePipeInt } from './custom-parse-int.pipe';
import { ForbiddenException } from './exceptions/forbiden.exception';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ForbiddenExceptionFilter } from './filters/forbidden-exception.filter';
import { BadRequestExceptionFilter } from './filters/bad-requestion-exception.filter';

@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}
    
    @Get()
    @UseFilters(ForbiddenExceptionFilter)
    getAllStudents(): IStudent[] {
        try {
            return this.studentService.getAllStudents();
        } catch (error) {
           throw new ForbiddenException();
        }
    }

    @Post()
    @UseFilters(BadRequestExceptionFilter)
    @HttpCode(HttpStatus.CREATED)
    createStudent(@Body() student: CreateStudentDto) {
        throw new BadRequestException();
        console.log(student instanceof CreateStudentDto, student);
        this.studentService.createStudent(student);
    }

    @Put(':id')
    updateStudent(@Param('id', ParseIntPipe) id: number, @Body() student: UpdateStudentDto) {
        console.log(typeof id, id);
        return this.studentService.updateStudent(id, student);
    }

    @Delete(':id')
    @UseFilters(BadRequestExceptionFilter, ForbiddenExceptionFilter)
    deleteStudent(@Param('id', CustomParsePipeInt) id: number) {
        console.log(typeof id, id);
        return this.studentService.deleteStudent(id);
    }
}
