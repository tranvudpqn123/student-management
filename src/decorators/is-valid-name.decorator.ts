import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsValidName(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isValidName',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
                    return typeof value === 'string' && nameRegex.test(value.trim()) && value.trim().length > 0;
                },
                defaultMessage() {
                    return 'Name must contain only letters and spaces, no numbers or special characters';
                }
            },
        });
    };
}