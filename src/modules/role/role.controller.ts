import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateRoleDto } from './dtos/create-role.dto';
import { RoleService } from './role.service';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLES } from 'src/common/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('role')
export class RoleController {

    constructor(private readonly roleService: RoleService) {}

    @Roles([ROLES.ADMIN, ROLES.SUPER_ADMIN])
    @Post()
    createRole(@Body() createRoleDto: CreateRoleDto) {
        return this.roleService.createRole(createRoleDto);
    }
}
