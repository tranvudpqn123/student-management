import { Injectable } from "@nestjs/common";
import * as sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UpdateImageUseCase {
    private readonly IMAGE_SIZE = 256;
    private readonly ROOT_FOLDER = 'uploads';
    private readonly PROCESSED_FOLDER = 'processed';

    async execute(file: Express.Multer.File) {
        // Đường dẫn file gốc
        const originalPath = file.path;
        // Tạo tên file mới cho ảnh đã resize
        const processedDir = path.join(this.ROOT_FOLDER, this.PROCESSED_FOLDER);
        if (!fs.existsSync(processedDir)) {
            fs.mkdirSync(processedDir, { recursive: true });
        }
        const processedFilename = 'resized-' + file.filename;
        const processedPath = path.join(processedDir, processedFilename);

        // Resize ảnh về 256x256 bằng Sharp
        await sharp(originalPath)
            .resize(this.IMAGE_SIZE, this.IMAGE_SIZE)
            .toFile(processedPath);

        return {
            original: originalPath.replace(/\\/g, '/'),
            resized: processedPath.replace(/\\/g, '/')
        };
    }
}