import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { DepartmentService } from './department.service';
import { UpdateDepartmentDto } from './dtos/update-department.dto';

@Controller('departments')
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService) {}

    @Post()
    createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
        return this.departmentService.createDepartment(createDepartmentDto);
    }

    @Get()
    getAllDepartments() {
        return this.departmentService.findAllDepartments();
    }

    @Put(':id')
    updateDepartment(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
        return this.departmentService.updateDepartment(id, updateDepartmentDto);
    }

    @Delete(':id')
    deleteDepartment(@Param('id') id: string) {
        return this.departmentService.deleteDepartment(id);
    }
}
