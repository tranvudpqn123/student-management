import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

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
}
