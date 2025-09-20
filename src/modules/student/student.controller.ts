import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { GetStudentQueryDto } from './dtos/get-student-query.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLES } from 'src/common/enums/role.enum';
import { BlackListGuard } from 'src/guards/black-list.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CacheInterceptor } from 'src/interceptors/cache.interceptor';

@ApiTags('students')
@UseGuards(AuthGuard('jwt'), BlackListGuard)
@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService) { }

    @Roles([ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.USER])
    @UseGuards(RoleGuard)
    @Get()
    @UseInterceptors(CacheInterceptor)
    @ApiOperation({ summary: 'Get all students', description: 'Retrieve a list of all students with pagination' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
    @ApiResponse({ status: 200, description: 'Students retrieved successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async getAllStudents(
        @Query() query: GetStudentQueryDto,
        @Req() req: any
    ) {
        return await this.studentService.getAllStudents(query, req.user);
    }

    @Roles([ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.USER])
    @Get(':id')
    @ApiOperation({ summary: 'Get a student by ID', description: 'Retrieve a student by their ID' })
    @ApiResponse({ status: 200, description: 'Student found', type: CreateStudentDto })
    @ApiResponse({ status: 404, description: 'Student not found' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async getStudent(@Param('id') id: string) {
        return await this.studentService.getStudent(id);
    }

    @Roles([ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.USER])
    @UseGuards(RoleGuard)
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
    createStudent(@Req() request, @Body() student: CreateStudentDto) {
        return this.studentService.createStudent(request.user.id, student);
    }

    @Roles([ROLES.ADMIN, ROLES.SUPER_ADMIN])
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

    @Roles([ROLES.ADMIN, ROLES.SUPER_ADMIN])
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a student', description: 'Remove a student from the system' })
    @ApiResponse({ status: 200, description: 'Student deleted successfully' })
    @ApiResponse({ status: 404, description: 'Student not found' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    deleteStudent(@Param('id') id: string) {
        return this.studentService.deleteStudent(id);
    }

    @Post('upload-avatar')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads', // Thư mục lưu file
            filename: (req, file, cb) => {
                // Đặt tên file: studentId + đuôi file
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + extname(file.originalname));
            }
        }),
        limits: { fileSize: 2 * 1024 * 1024 }, // Giới hạn file 2MB
        fileFilter: (req, file, cb) => {
            // Chỉ cho phép file ảnh
            if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                return cb(new Error('Only image files are allowed!'), false);
            }
            cb(null, true);
        }
    }))
    async uploadAvatar(@UploadedFile() file: Express.Multer.File) {
        return this.studentService.handleUploadAvatar(file);
    }
}
