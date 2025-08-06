import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CreateTeacherDto } from './dtos/create-teacher.dto';
import { TeacherService } from './teacher.service';
import { PaginationQueryDto } from 'src/common/pagination/pagination-query.dto';
import { GetTeacherQueryDto } from './dtos/get-teacher-query.dto';

@Controller('teachers')
export class TeacherController {

    constructor(private readonly teacherService: TeacherService) {}
    
    @Post()
    createTeacher(@Body() createTeacher: CreateTeacherDto) {
        return this.teacherService.createTeacher(createTeacher);
    }

    @Get()
    getTeachers(
        @Query() query: GetTeacherQueryDto
    ) {
        return this.teacherService.getTeachers(query);
    }

    @Delete(':id')
    deleteTeacher(@Param('id') id: string) {
        return this.teacherService.deleteTeacher(id);
    }
}
