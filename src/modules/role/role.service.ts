import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dtos/create-role.dto';
import { IRoleRepository, ROLE_REPOSITORY } from './interfaces/interface.repository.interface';

@Injectable()
export class RoleService {
    constructor(
        @Inject(ROLE_REPOSITORY)
        private readonly roleRepository: IRoleRepository
    ) {}

    async createRole(createRoleDto: CreateRoleDto) {
        const newRole = await this.roleRepository.create(createRoleDto);
        return newRole;
    } 

    async getRoleByName(name: string) {
        return await this.roleRepository.findOneBy({ name });

    }
}
