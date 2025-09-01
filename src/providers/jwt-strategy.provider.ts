import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IUserAuthentication } from "src/models/user-authentication.interface";

@Injectable()
export class JwtStrategyProvider extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_TOKEN_SECRET,
        });
    }

    async validate(payload: any): Promise<IUserAuthentication> {
        return { id: payload.sub, email: payload.email, role: payload.role };
    }
}