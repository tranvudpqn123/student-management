import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { HashingProvider } from 'src/providers/hasding.provider';
import { BcryptProvider } from 'src/providers/bcript.provider';
import { ConfigModule } from '@nestjs/config';
import authConfig from './../../config/auth.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
    controllers: [AuthController],
    providers: [
        AuthService,
        {
            provide: HashingProvider,
            useClass: BcryptProvider
        }
    ],
    imports: [
        UserModule,
        ConfigModule.forFeature(authConfig),
        JwtModule.registerAsync(authConfig.asProvider())
    ]
})
export class AuthModule { }
