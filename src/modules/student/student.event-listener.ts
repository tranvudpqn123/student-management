import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class StudentEventsListener {
    @OnEvent('student.created')
    handleStudentCreatedEvent(payload: any) {
        console.log('Student created event received:', payload);
        // Thực hiện các hành động cần thiết khi sự kiện được phát ra
    }
}