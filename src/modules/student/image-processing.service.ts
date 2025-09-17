import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { QUEUE_NAME } from 'src/common/enums/queue-name.enum';
import { UpdateImageUseCase } from './use-cases/upload-image.use-case';

@Processor(QUEUE_NAME.IMAGE_OPTIMIZE)
@Injectable()
export class ImageProcessingService extends WorkerHost {
    constructor(
        private readonly updateImageUseCase: UpdateImageUseCase
    ) {
        super();
    }

    async process(job: Job) {
        return await this.updateImageUseCase.execute(job.data.file);
    }

    @OnWorkerEvent('completed')
    onCompleted(job: Job, result: any) {
        console.log(`Job ${job.id} completed with result:`, result);
    }

    @OnWorkerEvent('failed')
    onFailed(job: Job, error: any) {
        console.log(`Job ${job.id} failed with error:`, error);
    }

    @OnWorkerEvent('error')
    onError(error: any) {
        console.error('Worker error:', error);
    }


}