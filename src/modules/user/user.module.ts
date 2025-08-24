import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { UserService } from './user.service';
import { HashingProvider } from 'src/providers/hasding.provider';
import { BcryptProvider } from 'src/providers/bcript.provider';

@Module({
    controllers: [UserController],
    imports: [
        TypeOrmModule.forFeature([Users])
    ],
    providers: [
        UserService,
        {
            provide: HashingProvider,
            useClass: BcryptProvider
        }
    ],
    exports: [UserService]
})
export class UserModule { }
