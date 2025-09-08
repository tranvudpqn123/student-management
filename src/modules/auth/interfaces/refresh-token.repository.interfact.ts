import { BaseRepositoryInterface } from "src/repository/base.repository.interfact";
import { RefreshToken } from "../entities/refresh-token.entity";

export const REFRESH_TOKEN_REPOSITORY = 'REFRESH_TOKEN_REPOSITORY';

export interface IRefreshTokenRepository extends BaseRepositoryInterface<RefreshToken> {

}