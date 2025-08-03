import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { LoggerMiddleware } from "./middlewares/logger.middleware";

@Module({
    controllers: [StudentController],
    providers: [StudentService]

})
export class StudentModule {
}