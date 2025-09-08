import { BaseRepository } from "src/repository/base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RefreshToken } from "../entities/refresh-token.entity";

export class RefreshTokenRepository extends BaseRepository<RefreshToken> {
    constructor(
        @InjectRepository(RefreshToken)
        private readonly refreshTokenRepository: Repository<RefreshToken>
    ) {
        super(refreshTokenRepository);
    }
    
}