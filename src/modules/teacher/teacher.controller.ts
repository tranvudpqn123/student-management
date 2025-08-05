import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTeacherDto } from './dtos/create-teacher.dto';
import { TeacherService } from './teacher.service';

@Controller('teachers')
export class TeacherController {

    constructor(private readonly teacherService: TeacherService) {}
    
    @Post()
    createTeacher(@Body() createTeacher: CreateTeacherDto) {
        return this.teacherService.createTeacher(createTeacher);
    }

    @Get()
    getTeachers() {
        return this.teacherService.getTeachers();
    }

    @Delete(':id')
    deleteTeacher(@Param('id') id: string) {
        return this.teacherService.deleteTeacher(id);
    }
}
