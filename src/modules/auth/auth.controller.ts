import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}
    
    @Post('signup')
    signup(@Body() request: CreateUserDto) {
        return this.authService.signup(request);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() request: LoginDto) {
        return this.authService.login(request);
    }

    @Post('refresh-token')
    refreshToken(@Req() req: any, @Body() request: RefreshTokenDto) {
        return this.authService.refreshToken(request);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Req() req) {
        const authHeader = req.headers['authorization'];
        const token = authHeader?.replace('Bearer ', '');
        console.log('Logout token:', token);
        if (token) {
            await this.authService.logout(token);
        }
    }

}
