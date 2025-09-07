import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { BlackListTokenReposiptory } from './black-list-token.repository';

@Injectable()
export class AuthService {

    constructor(
        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig>,
        private readonly userService: UserService,
        private readonly hashingProvider: HashingProvider,
        private readonly jwtService: JwtService,
        private readonly refreshTokenRepository: RefreshTokenRepository,
        private readonly blackListTokenRepository: BlackListTokenReposiptory
    ) { }

    async signup(request: CreateUserDto) {
        return await this.userService.createUser(null, request);
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

            const generatedToken = await this.generateToken(user);
            await this.registerRefreshToken(user, generatedToken.refreshToken);


            return generatedToken;

        } catch (error) {
            throw error;
        }
    }

    async refreshToken(request: RefreshTokenDto) {
        const oldRefreshToken = request.refreshToken;
        // Verify the refresh token
        try {
            const { sub } = await this.jwtService.verifyAsync(oldRefreshToken, {
                secret: this.authConfiguration.secret,
                audience: this.authConfiguration.audience,
                issuer: this.authConfiguration.issuer,
            });
            // Find user from db
            const user = await this.userService.getUserDetail(sub);
            // Generate a new access token and refresh token
            if (user) {
                const generatedToken = await this.generateToken(user);
                await this.registerRefreshToken(user, generatedToken.refreshToken, oldRefreshToken);
                return generatedToken;
            }
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException('Invalid refresh token');
        }

    }

    async logout(token: string) {
        await this.addToBlackList(token);
        return true;
    }

    private async registerRefreshToken(user: Users, newRefreshToken: string, oldRefreshToken = '') {
         const refreshTokenEntity = {
            user,
            token: newRefreshToken,
            expiresAt: new Date(Date.now() + this.authConfiguration.refreshTokenExpiresIn * 7)
        };

        if (oldRefreshToken === '') {
            await this.refreshTokenRepository.create(refreshTokenEntity);
        } else {
            const existingToken = await this.refreshTokenRepository.findByCondition({
                user: { id: user.id },
                token: oldRefreshToken
            });

            if (existingToken) {
                existingToken.token = newRefreshToken;
                existingToken.expiresAt = new Date(Date.now() + this.authConfiguration.refreshTokenExpiresIn * 7);
                await this.refreshTokenRepository.update(existingToken.id, existingToken);
            } else {
                throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND_TOKEN(oldRefreshToken));
            }
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
        const token = await this.signToken(user.id, this.authConfiguration.expiresIn, { email: user.email, role: user.role.name });
        const refreshToken = await this.signToken(user.id, this.authConfiguration.refreshTokenExpiresIn * 7);
        return {
            token,
            refreshToken
        };

    }

    private async addToBlackList(token: string) {
        // Lưu token vào danh sách đen (blacklist)
        await this.blackListTokenRepository.create({ token });
    }
}
