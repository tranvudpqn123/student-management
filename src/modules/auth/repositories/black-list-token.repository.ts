import { BaseRepository } from "src/repository/base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BlackListToken } from "../entities/black-list-token.entity";

export class BlackListTokenRepository extends BaseRepository<BlackListToken> {
    constructor(
        @InjectRepository(BlackListToken)
        private readonly repo: Repository<BlackListToken>
    ) {
        super(repo);
    }

}