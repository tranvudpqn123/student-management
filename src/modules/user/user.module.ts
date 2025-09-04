import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { UserService } from './user.service';
import { HashingProvider } from 'src/providers/hasding.provider';
import { BcryptProvider } from 'src/providers/bcript.provider';
import { RoleModule } from '../role/role.module';
import { userRepository } from './user.repository';

@Module({
    controllers: [UserController],
    imports: [
        RoleModule,
        TypeOrmModule.forFeature([Users])
    ],
    providers: [
        UserService,
        userRepository,
        {
            provide: HashingProvider,
            useClass: BcryptProvider
        }
    ],
    exports: [UserService]
})
export class UserModule { }
