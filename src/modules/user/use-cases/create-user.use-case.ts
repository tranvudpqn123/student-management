import { BadRequestException, HttpException, Inject, Injectable } from "@nestjs/common";
import { Users } from "../user.entity";
import { ERROR_MESSAGES } from "src/constants/error-message";
import { CreateUserDto } from "../dtos/create-user.dto";
import { IUserRepository, USER_REPOSITORY } from "../interfaces/user.reporsitory.interface";
import { HashingProvider } from "src/providers/hasding.provider";
import { RoleService } from "src/modules/role/role.service";
import { UserUtilityUseCase } from "./user-utility.use-case";

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
        private readonly hashingProvider: HashingProvider,
        private readonly roleService: RoleService,
        private readonly userUtilityUseCase: UserUtilityUseCase
    ) { }

    async execute(creatorId: string | null, request: CreateUserDto) {
        try {
            const existingRole = await this.roleService.getRoleByName(request.role);
            if (!existingRole) {
                throw new BadRequestException(ERROR_MESSAGES.ROLE_NOT_FOUND(request.role));
            }

            const existingUser = await this.userUtilityUseCase.findUserByEmail(request.email);
            if (existingUser) {
                throw new BadRequestException(ERROR_MESSAGES.ALREADY_EXISTS_EMAIL(existingUser.email, 'User'));
            }

            let creatorUser: Users | null = null;
            if (creatorId) {
                creatorUser = await this.userRepository.findById(creatorId);
                if (!creatorUser) {
                    throw new BadRequestException(ERROR_MESSAGES.NOT_FOUND_BY_ID(creatorId, 'users'));
                }
            }

            const username = request.email.split('@')[0];
            const user = await this.userRepository.create({
                ...request,
                username,
                password: await this.hashingProvider.hashPassword(request.password),
                role: existingRole,
                createdBy: creatorUser
            });
            return user;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Failed to create user', 500);
        }
    }
}