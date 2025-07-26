import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { StudentService } from './student.service';
import { IStudent } from './student.interface';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { CustomParsePipeInt } from './custom-parse-int.pipe';

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
        console.log(student instanceof CreateStudentDto, student);
        this.studentService.createStudent(student);
    }

    @Put(':id')
    updateStudent(@Param('id', ParseIntPipe) id: number, @Body() student: UpdateStudentDto) {
        console.log(typeof id, id);
        return this.studentService.updateStudent(id, student);
    }

    @Delete(':id')
    deleteStudent(@Param('id', CustomParsePipeInt) id: number) {
        console.log(typeof id, id);
        return this.studentService.deleteStudent(id);
    }
}
