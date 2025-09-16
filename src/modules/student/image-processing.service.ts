import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
// import { Job } from 'bullmq';
import { QUEUE_NAME } from 'src/common/enums/queue-name.enum';

@Processor(QUEUE_NAME.IMAGE_OPTIMIZE)
@Injectable()
export class ImageProcessingService extends WorkerHost {
    async process(job: Job) {
        // Xử lý ảnh ở đây (resize, crop, ...)
        console.log('Processing image:', job.data);
        // Ví dụ: gọi sharp để resize ảnh

        return await new Promise((resolve) =>
			setTimeout(() => resolve(job.data), 30000),
		);
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

import { Queue } from 'bullmq';

const myQueue = new Queue('Paint');

const counts = await myQueue.getJobCounts('wait', 'completed', 'failed');
// Returns an object like this { wait: number, completed: number, failed: number }