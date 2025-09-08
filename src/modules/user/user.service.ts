import { Injectable } from '@nestjs/common';
// DTOs
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserQueryDto } from './dtos/get-user-query.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
// Use cases
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';
import { GetUserDetailUseCase } from './use-cases/get-user-detail.use-case';
import { GetAllUsersUseCase } from './use-cases/get-all-users.use-case';
import { UserUtilityUseCase } from './use-cases/user-utility.use-case';

@Injectable()
export class UserService {

    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
        private readonly getUserDetailUseCase: GetUserDetailUseCase,
        private readonly getAllUsersUseCase: GetAllUsersUseCase,
        private readonly userUtilityUseCase: UserUtilityUseCase
    ) { }

    async getAllUsers(query: GetUserQueryDto) {
        return await this.getAllUsersUseCase.execute(query);
    }

    async createUser(creatorId: string | null, request: CreateUserDto) {
        return await this.createUserUseCase.execute(creatorId, request);
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        return await this.updateUserUseCase.execute(id, updateUserDto);
    }

    async deleteUser(id: string) {
        return await this.deleteUserUseCase.execute(id);
    }

    async getUserDetail(id: string) {
        return await this.getUserDetailUseCase.execute(id);
    }

    async findUserByEmail(email: string) {
        return await this.userUtilityUseCase.findUserByEmail(email);
    }

}
