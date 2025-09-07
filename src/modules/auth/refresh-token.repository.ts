import { BaseRepository } from "src/repository/base.repository";
import { RefreshToken } from "./refresh-token.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class RefreshTokenRepository extends BaseRepository<RefreshToken> {
    constructor(
        @InjectRepository(RefreshToken)
        private readonly refreshTokenRepository: Repository<RefreshToken>
    ) {
        super(refreshTokenRepository);
    }
    
}