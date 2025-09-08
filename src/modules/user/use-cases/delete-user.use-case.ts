import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ERROR_MESSAGES } from "src/constants/error-message";
import { IUserRepository, USER_REPOSITORY } from "../interfaces/user.reporsitory.interface";

@Injectable()
export class DeleteUserUseCase {

    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
    ) {}

    async execute(id: string) {
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new BadRequestException(ERROR_MESSAGES.NOT_FOUND_BY_ID(id, 'users'));
        }
        return await this.userRepository.delete(id);
    }
}