import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { BLACK_LIST_TOKEN_REPOSITORY } from "src/modules/auth/interfaces/black-list-token.repository.interface";
import { BlackListTokenRepository } from "src/modules/auth/repositories/black-list-token.repository";

@Injectable()
export class BlackListGuard implements CanActivate {
    constructor(
        @Inject(BLACK_LIST_TOKEN_REPOSITORY)
        private readonly blackListTokenRepository: BlackListTokenRepository
    ) {

    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization']?.replace('Bearer ', '');
        if (!token) throw new UnauthorizedException('No token provided');

        const isBlacklisted = await this.blackListTokenRepository.findByCondition({ token });
        if (isBlacklisted) throw new UnauthorizedException('Token is blacklisted');

        return true;
    } 
}