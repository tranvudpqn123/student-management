import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { GetUserQueryDto } from "../dtos/get-user-query.dto";
import { Role } from "src/modules/role/role.entity";
import { ERROR_MESSAGES } from "src/constants/error-message";
import { RoleService } from "src/modules/role/role.service";
import { IUserRepository, USER_REPOSITORY } from "../interfaces/user.reporsitory.interface";

@Injectable()
export class GetAllUsersUseCase {

    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
        private readonly roleService: RoleService,

    ) { }

    async execute(query: GetUserQueryDto) {
        let existingRole: Role | null = null;
        if (query.role) {
            existingRole = await this.roleService.getRoleByName(query.role);
            if (!existingRole) {
                throw new BadRequestException(ERROR_MESSAGES.ROLE_NOT_FOUND(query.role));
            }
        }

        let condition: object = existingRole ? {
            role: { id: existingRole.id }
        } : {};

        if (query.email) {
            condition = {
                ...condition,
                email: query.email
            };
        }

        return this.userRepository.findAll(
            query.limit * (query.page - 1),
            query.limit,
            [],
            condition
        );
    }
}