import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { HashingProvider } from 'src/providers/hasding.provider';
import { BcryptProvider } from 'src/providers/bcript.provider';
import { ConfigModule } from '@nestjs/config';
import authConfig from './../../config/auth.config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { BlackListToken } from './entities/black-list-token.entity';
import { BLACK_LIST_TOKEN_REPOSITORY } from './interfaces/black-list-token.repository.interface';
import { REFRESH_TOKEN_REPOSITORY } from './interfaces/refresh-token.repository.interfact';
import { RefreshTokenRepository } from './repositories/refresh-token.repository';
import { BlackListTokenRepository } from './repositories/black-list-token.repository';

@Module({
    controllers: [AuthController],
    providers: [
        AuthService,
        {
            provide: REFRESH_TOKEN_REPOSITORY,
            useClass: RefreshTokenRepository
        },
        {
            provide: BLACK_LIST_TOKEN_REPOSITORY,
            useClass: BlackListTokenRepository
        },
        {
            provide: HashingProvider,
            useClass: BcryptProvider
        }
    ],
    imports: [
        UserModule,
        TypeOrmModule.forFeature([RefreshToken, BlackListToken]),
        ConfigModule.forFeature(authConfig),
        JwtModule.registerAsync(authConfig.asProvider())
    ],
    exports: [BLACK_LIST_TOKEN_REPOSITORY]
})
export class AuthModule { }
