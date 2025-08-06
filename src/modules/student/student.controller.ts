import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Res, UseFilters } from '@nestjs/common';
import { StudentService } from './student.service';
import { IStudent } from './student.interface';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { CustomParsePipeInt } from './custom-parse-int.pipe';
import { ForbiddenException } from './exceptions/forbiden.exception';
import { GetStudentQueryDto } from './dtos/get-student-query.dto';

@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}
    
    @Get()
    async getAllStudents(
        @Query() query: GetStudentQueryDto
    ) {
        return await this.studentService.getAllStudents(query);
    }

    @Get(':id')
    async getStudent(@Param('id') id: string) {
        return await this.studentService.getStudent(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createStudent(@Body() student: CreateStudentDto) {
        return this.studentService.createStudent(student);
    }

    @Put(':id')
    updateStudent(@Param('id') id: string, @Body() student: UpdateStudentDto) {
        return this.studentService.updateStudent(id, student);
    }

    @Delete(':id')
    deleteStudent(@Param('id') id: string) {
        return this.studentService.deleteStudent(id);
    }
}
