import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository, USER_REPOSITORY } from "../interfaces/user.reporsitory.interface";
import { Users } from "../user.entity";

@Injectable()
export class UserUtilityUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
    ) {}
    
    async findUserByEmail(email: string): Promise<Users | null> {
        const existingUser = await this.userRepository.findOneBy({ email });
        return existingUser;
    }
}