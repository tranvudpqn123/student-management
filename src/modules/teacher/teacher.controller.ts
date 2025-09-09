import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CreateTeacherDto } from './dtos/create-teacher.dto';
import { TeacherService } from './teacher.service';
import { GetTeacherQueryDto } from './dtos/get-teacher-query.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLES } from 'src/common/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@ApiTags('teachers')
@Controller('teachers')
export class TeacherController {

    constructor(private readonly teacherService: TeacherService) { }

    @Roles([ROLES.ADMIN, ROLES.SUPER_ADMIN])
    @Post()
    @ApiOperation({ summary: 'Create a new teacher', description: 'Add a new teacher to the system' })
    @ApiResponse({ status: 201, description: 'Teacher created successfully', type: CreateTeacherDto })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiBody({
        type: CreateTeacherDto,
        description: 'Details of the teacher to be created',
        required: true,
        examples: {
            example1: {
                summary: 'Example teacher',
                description: 'A sample teacher object',
                value: {
                    "firstName": "Trần Lê Anh",
                    "lastName": "Vũ",
                    "salary": 15000000,
                    "email": "tranvudpqn123@gmail.com",
                    "departmentIds": ["7f16acac-499d-493d-8055-686bdde794ca", "8084807a-0cf2-4018-a9b6-d8b4fde7da23"]
                }
            }
        }
    })
    createTeacher(@Body() createTeacher: CreateTeacherDto) {
        return this.teacherService.createTeacher(createTeacher);
    }

    @Roles([ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.USER])
    @Get()
    @ApiOperation({ summary: 'Get all teachers', description: 'Retrieve a list of all teachers with pagination' })
    @ApiResponse({ status: 200, description: 'Teachers retrieved successfully' })
    getTeachers(
        @Query() query: GetTeacherQueryDto
    ) {
        return this.teacherService.getTeachers(query);
    }

    @Roles([ROLES.ADMIN, ROLES.SUPER_ADMIN])
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a teacher', description: 'Remove a teacher from the system' })
    @ApiResponse({ status: 200, description: 'Teacher deleted successfully' })
    @ApiResponse({ status: 404, description: 'Teacher not found' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    deleteTeacher(@Param('id') id: string) {
        return this.teacherService.deleteTeacher(id);
    }
}
