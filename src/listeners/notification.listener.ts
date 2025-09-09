import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { CHANNELS } from "src/common/enums/chanels.enum";

@Injectable()
export class NotificationListener {
    @OnEvent(CHANNELS.EMAIL)
    sendEmail(payload: any) {
        console.log('Sending email with payload:', payload);
    }

    @OnEvent(CHANNELS.SMS)
    sendSMS(payload: any) {
        console.log('Sending SMS with payload:', payload);
    }

    @OnEvent(CHANNELS.PUSH_NOTIFICATION)
    sendPushNotification(payload: any) {
        console.log('Sending push notification with payload:', payload);
    }

}