import { BadRequestException, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { ERROR_MESSAGES } from 'src/constants/error-message';
import { HashingProvider } from 'src/providers/hasding.provider';
import { RoleService } from '../role/role.service';
import { GetUserQueryDto } from './dtos/get-user-query.dto';
import { Role } from '../role/role.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { IUserRepository, USER_REPOSITORY } from './interfaces/user.reporsitory.interface';

@Injectable()
export class UserService {

    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
        private readonly hashingProvider: HashingProvider,
        private readonly roleService: RoleService
    ) { }

    async getAllUsers(query: GetUserQueryDto) {
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

    async createUser(creatorId: string | null, request: CreateUserDto) {
        try {
            const existingRole = await this.roleService.getRoleByName(request.role);
            if (!existingRole) {
                throw new BadRequestException(ERROR_MESSAGES.ROLE_NOT_FOUND(request.role));
            }

            const existingUser = await this.findUserByEmail(request.email);
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

    async updateUser(id: string, updateUserDto: UpdateUserDto) {
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

    async deleteUser(id: string) {
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new BadRequestException(ERROR_MESSAGES.NOT_FOUND_BY_ID(id, 'users'));
        }
        return await this.userRepository.delete(id);
    }

    async getUserDetail(id: string) {
        const existingUser = await this.userRepository.findById(id, ['createdBy', 'updatedBy', 'role']);
        if (!existingUser) {
            throw new BadRequestException(ERROR_MESSAGES.NOT_FOUND_BY_ID(id, 'users'));
        }
        return existingUser;
    }

    async findUserByEmail(email: string): Promise<Users | null> {
        const existingUser = await this.userRepository.findOneBy({ email });
        return existingUser;
    }

}
