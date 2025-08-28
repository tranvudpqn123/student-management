import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import { NotFoundExceptionFilter } from '../student/filters/not-found-exception.filter';
import { ERROR_MESSAGES } from 'src/constants/error-message';
import { HashingProvider } from 'src/providers/hasding.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import authConfig from './../../config/auth.config';
import { Users } from '../user/user.entity';

@Injectable()
export class AuthService {

    constructor(
        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig>,
        private readonly userService: UserService,
        private readonly hashingProvider: HashingProvider,
        private readonly jwtService: JwtService
    ) { }

    signup(request: CreateUserDto) {
        return this.userService.createUser(request);
    }

    async login(loginDto: LoginDto) {
        try {
            const { email, password } = loginDto;
            const user = await this.userService.findUserByEmail(email);

            if (!user) {
                throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND_BY_EMAIL(email, 'User'));
            }

            const isEqual = this.hashingProvider.comparePassword(password, user.password);

            if (!isEqual) {
                throw new BadRequestException(ERROR_MESSAGES.PASSWORD_NOT_MATCH());
            }

            return await this.generateToken(user);

        } catch (error) {

        }

    }

    private async signToken<T>(userId: string, expiredIn: number, payload?: T) {
        return await this.jwtService.signAsync(
            // Dữ liệu bạn muốn nhúng vào token
            {
                sub: userId,
                ...payload
            }
            /**
             * Cấu hình của một token bao gồm:
             * 1. secret: chuỗi bí mật dùng để ký token
             * 2. expiresIn: thời gian sống của token (tính bằng giây)
             * 3. audience: đối tượng nhận token
             * 4. issuer: định danh của hệ thống phát hành token
             *
             */
            , {
                secret: this.authConfiguration.secret,
                expiresIn: expiredIn,
                audience: this.authConfiguration.audience,
                issuer: this.authConfiguration.issuer,
            });
    }

    private async generateToken(user: Users) {
        const token = await this.signToken(user.id, this.authConfiguration.expiresIn, {email: user.email});
        const refreshToken = await this.signToken(user.id, this.authConfiguration.refreshTokenExpiresIn);
        return {
            token,
            refreshToken
        };

    }
}
