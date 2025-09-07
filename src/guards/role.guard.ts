import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "src/decorators/roles.decorator";
import { IUserAuthentication } from "src/models/user-authentication.interface";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const requiredRoles = this.getRequiredRoles(context);

        return this.hasRole(user, requiredRoles);
    }

    private getRequiredRoles(context: ExecutionContext): string[] {
        const roles = this.reflector.get<string[]>(Roles, context.getHandler());
        return roles || [];
    }

    private hasRole(user: IUserAuthentication, roles: string[]): boolean {
        if (!user || !user.role) {
            return false;
        }
        return roles.some(role => user.role === role);
    }
}