import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { DepartmentService } from './department.service';
import { UpdateDepartmentDto } from './dtos/update-department.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';


@UseGuards(AuthGuard('jwt'))
@ApiTags('departments')
@Controller('departments')
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new department', description: 'Add a new department to the system' })
    @ApiResponse({ status: 201, description: 'Department created successfully', type: CreateDepartmentDto })
    @ApiBody({
        type: CreateDepartmentDto,
        description: 'Details of the department to be created',
        required: true,
        examples: {
            example1: {
                summary: 'Example department',
                description: 'A sample department object',
                value: {
                    "name": "May mặc",
                    "description": ""
                }
            }
        }
    })
    createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
        return this.departmentService.createDepartment(createDepartmentDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all departments', description: 'Retrieve a list of all departments' })
    @ApiResponse({ status: 200, description: 'Departments retrieved successfully' })
    getAllDepartments() {
        return this.departmentService.findAllDepartments();
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a department', description: 'Modify an existing department' })
    @ApiResponse({ status: 200, description: 'Department updated successfully', type: UpdateDepartmentDto })
    @ApiResponse({ status: 404, description: 'Department not found' })
    updateDepartment(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
        return this.departmentService.updateDepartment(id, updateDepartmentDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a department', description: 'Remove a department from the system' })
    @ApiResponse({ status: 200, description: 'Department deleted successfully' })
    @ApiResponse({ status: 404, description: 'Department not found' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    deleteDepartment(@Param('id') id: string) {
        return this.departmentService.deleteDepartment(id);
    }
}
