import { BaseRepository } from "src/repository/base.repository";
import { BlackListToken } from "./black-list-token.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class BlackListTokenReposiptory extends BaseRepository<BlackListToken> {
    constructor(
        @InjectRepository(BlackListToken)
        private readonly repo: Repository<BlackListToken>
    ) {
        super(repo);
    }

}