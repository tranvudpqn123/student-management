import { BaseRepository } from "src/repository/base.repository";
import { Users } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class userRepository extends BaseRepository<Users> {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>
    ) {
        super(userRepository);
    }
}