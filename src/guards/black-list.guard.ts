import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { BlackListTokenReposiptory } from "src/modules/auth/black-list-token.repository";

@Injectable()
export class BlackListGuard implements CanActivate {
    constructor(private readonly blackListTokenRepository: BlackListTokenReposiptory) {

    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization']?.replace('Bearer ', '');

        console.log('Token from header:', token);

        if (!token) throw new UnauthorizedException('No token provided');

        const isBlacklisted = await this.blackListTokenRepository.findByCondition({ token });
        if (isBlacklisted) throw new UnauthorizedException('Token is blacklisted');

        return true;
    } 
}