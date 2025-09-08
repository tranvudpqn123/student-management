import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { UserService } from './user.service';
import { RoleModule } from '../role/role.module';
import { UserRepository } from './user.repository';
// Models
import { USER_REPOSITORY } from './interfaces/user.reporsitory.interface';
// Use cases
import { UserUtilityUseCase } from './use-cases/user-utility.use-case';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';
import { GetUserDetailUseCase } from './use-cases/get-user-detail.use-case';
import { GetAllUsersUseCase } from './use-cases/get-all-users.use-case';
// Providers
import { HashingProvider } from 'src/providers/hasding.provider';
import { BcryptProvider } from 'src/providers/bcript.provider';

@Module({
    controllers: [UserController],
    imports: [
        RoleModule,
        TypeOrmModule.forFeature([Users])
    ],
    providers: [
        UserService,
        UserUtilityUseCase,
        CreateUserUseCase,
        UpdateUserUseCase,
        DeleteUserUseCase,
        GetUserDetailUseCase,
        GetAllUsersUseCase,
        {
            provide: USER_REPOSITORY,
            useClass: UserRepository,
        },
        {
            provide: HashingProvider,
            useClass: BcryptProvider
        }
    ],
    exports: [UserService]
})
export class UserModule { }
