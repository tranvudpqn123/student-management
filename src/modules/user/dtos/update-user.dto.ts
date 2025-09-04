import { IsOptional, IsString, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "PasswordDependency", async: false })
class PasswordDependencyConstraint implements ValidatorConstraintInterface {
    validate(_: any, args: ValidationArguments) {
        const obj = args.object as any;
        // Nếu có newPassword mà không có oldPassword thì báo lỗi
        if (obj.newPassword && !obj.oldPassword) {
            return false;
        }
        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return "If newPassword is provided, oldPassword must also be provided";
    }
}

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    newPassword?: string = '';

    @IsString()
    @IsOptional()
    oldPassword?: string = '';

    @IsString()
    @IsOptional()
    role?: string = '';

    @Validate(PasswordDependencyConstraint)
    passwordDependencyCheck?: any; 
}