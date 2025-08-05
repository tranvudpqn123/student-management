import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class NameValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (typeof value !== 'string') {
            throw new BadRequestException('Name must be a string');
        }

        // Regex để kiểm tra chỉ cho phép chữ cái, khoảng trắng và dấu
        const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;

        if (!nameRegex.test(value)) {
            throw new BadRequestException('Name must contain only letters and spaces, no numbers or special characters');
        }

        // Kiểm tra không được chỉ toàn khoảng trắng
        if (value.trim().length === 0) {
            throw new BadRequestException('Name cannot be empty or contain only spaces');
        }

        // Trả về tên đã được trim
        return value.trim();
    }
}