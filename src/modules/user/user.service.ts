import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { ERROR_MESSAGES } from 'src/constants/error-message';
import { HashingProvider } from 'src/providers/hasding.provider';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
        private readonly hashingProvider: HashingProvider
    ) { }

    async createUser(request: CreateUserDto): Promise<Users> {
        try {
            const existingUser = await this.findUserByEmail(request.email);
            if (existingUser) {
                throw new BadRequestException(ERROR_MESSAGES.ALREADY_EXISTS_EMAIL(existingUser.email, 'User'));
            }

            const username = request.email.split('@')[0];
            const user = this.userRepository.create({
                ...request,
                username,
                password: await this.hashingProvider.hashPassword(request.password)
            });
            return this.userRepository.save(user);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Failed to create user', 500);
        }
    }

    async findUserByEmail(email: string): Promise<Users | null> {
        return await this.userRepository.findOne({ where: { email } });
    }

}
