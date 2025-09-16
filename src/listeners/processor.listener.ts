import { Processor } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";

@Processor('image-optimize')
@Injectable()
export class ProcessorListener {

}