import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUserQueryDto } from './dtos/get-user-query.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { request } from 'express';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLES } from 'src/common/enums/role.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { CreateUserDto } from './dtos/create-user.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getAllUsers(@Query() query: GetUserQueryDto) {
        return this.userService.getAllUsers(query);
    }

    @Get(':id')
    getUserById(@Param('id') id: string) {
        return this.userService.getUserDetail(id);
    }

    @Put()
    updateUser(@Req() req, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(req.user.id, updateUserDto);
    }

    @Roles([ROLES.ADMIN])
    @UseGuards(RoleGuard)    
    @Delete(':id')
    deleteUser(@Req() request, @Param('id') id: string) {
        console.log('user: ', request.user)
        return this.userService.deleteUser(id);
    }

    @Roles([ROLES.ADMIN])
    @UseGuards(RoleGuard)    
    @Post()
    createUser(@Req() request, @Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(request.user.id, createUserDto);
    }
}
