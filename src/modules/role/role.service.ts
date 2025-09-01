import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dtos/create-role.dto';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
    constructor(
        private readonly roleRepository: RoleRepository
    ) {}

    async createRole(createRoleDto: CreateRoleDto) {
        const newRole = await this.roleRepository.create(createRoleDto);
        return newRole;
    } 

    async getRoleByName(name: string) {
        return await this.roleRepository.findOneBy({ name });

    }
}
