import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { GetStudentQueryDto } from './dtos/get-student-query.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('students')
@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService) { }

    @Get()
    @ApiOperation({ summary: 'Get all students', description: 'Retrieve a list of all students with pagination' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
    @ApiResponse({ status: 200, description: 'Students retrieved successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async getAllStudents(
        @Query() query: GetStudentQueryDto,
        @Req() req: any
    ) {
        console.log('Request user:', req.user);
        return await this.studentService.getAllStudents(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a student by ID', description: 'Retrieve a student by their ID' })
    @ApiResponse({ status: 200, description: 'Student found', type: CreateStudentDto })
    @ApiResponse({ status: 404, description: 'Student not found' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async getStudent(@Param('id') id: string) {
        return await this.studentService.getStudent(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new student', description: 'Add a new student to the system' })
    @ApiResponse({ status: 201, description: 'Student created successfully', type: CreateStudentDto })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiBody({
        type: CreateStudentDto,
        description: 'Details of the student to be created',
        required: true,
        examples: {
            example1: {
                summary: 'Example student',
                description: 'A sample student object',
                value: {
                    "name": "John Doe",
                    "age": 15,
                    "major": "Computer Science",
                    "email": "joinh@gmail.com",
                    "departmentId": "7f16acac-499d-493d-8055-686bdde794ca"
                }
            }
        }
    })
    createStudent(@Body() student: CreateStudentDto) {
        return this.studentService.createStudent(student);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a student', description: 'Modify an existing student\'s details' })
    @ApiResponse({ status: 200, description: 'Student updated successfully', type: UpdateStudentDto })
    @ApiResponse({ status: 404, description: 'Student not found' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiBody({
        type: CreateStudentDto,
        description: 'Details of the student to be created',
        required: true,
        examples: {
            example1: {
                summary: 'Example student',
                description: 'A sample student object',
                value: {
                    "name": "John Doe",
                    "age": 15,
                    "major": "Computer Science",
                    "email": "joinh@gmail.com",
                    "departmentId": "7f16acac-499d-493d-8055-686bdde794ca"
                }
            }
        }
    })
    updateStudent(@Param('id') id: string, @Body() student: UpdateStudentDto) {
        return this.studentService.updateStudent(id, student);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a student', description: 'Remove a student from the system' })
    @ApiResponse({ status: 200, description: 'Student deleted successfully' })
    @ApiResponse({ status: 404, description: 'Student not found' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    deleteStudent(@Param('id') id: string) {
        return this.studentService.deleteStudent(id);
    }
}
