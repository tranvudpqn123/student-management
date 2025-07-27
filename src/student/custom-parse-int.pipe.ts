import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class CustomParsePipeInt implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): number {
        const parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue)) {
            throw new BadRequestException(`${metadata.data} must be an integer`);
        }
        return parsedValue;
    }
}