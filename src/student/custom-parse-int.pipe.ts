import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class CustomParsePipeInt implements PipeTransform {
    transform(value: any) {
        const parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue)) {
            throw new BadRequestException('Invalid integer value');
        }
        return parsedValue;
    }
}