import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ERROR_MESSAGES } from "src/constants/error-message";
import { IUserRepository, USER_REPOSITORY } from "../interfaces/user.reporsitory.interface";
import { HashingProvider } from "src/providers/hasding.provider";
import { RoleService } from "src/modules/role/role.service";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { Role } from "src/modules/role/role.entity";

@Injectable()
export class UpdateUserUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
        private readonly hashingProvider: HashingProvider,
        private readonly roleService: RoleService,
    ) { }

    async execute(id: string, updateUserDto: UpdateUserDto) {
        const { newPassword, oldPassword, role } = updateUserDto;
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new BadRequestException(ERROR_MESSAGES.NOT_FOUND_BY_ID(id, 'users'));
        }


        if (oldPassword && newPassword) {
            const isEqual = await this.hashingProvider.comparePassword(oldPassword, existingUser.password);

            if (!isEqual) {
                throw new BadRequestException(ERROR_MESSAGES.PASSWORD_NOT_MATCH());
            }
        }


        let existingRole: Role | null = null;
        if (role) {
            existingRole = await this.roleService.getRoleByName(role);
            if (!existingRole) {
                throw new BadRequestException(ERROR_MESSAGES.ROLE_NOT_FOUND(role));
            }
        }

        // Update user properties
        existingUser.password = newPassword ? await this.hashingProvider.hashPassword(newPassword) : existingUser.password;
        existingUser.role = existingRole || existingUser.role;

        const res = await this.userRepository.update(id, existingUser);
        return res.affected && res.affected > 0 ? existingUser : null;
    }
}