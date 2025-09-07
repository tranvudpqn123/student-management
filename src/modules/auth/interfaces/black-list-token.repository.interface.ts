import { BaseRepositoryInterface } from "src/repository/base.repository.interfact";
import { BlackListToken } from "../black-list-token.entity";

export const BLACK_LIST_TOKEN_REPOSITORY = 'BLACK_LIST_TOKEN_REPOSITORY';
export interface IBlackListTokenRepository extends BaseRepositoryInterface<BlackListToken> {

}