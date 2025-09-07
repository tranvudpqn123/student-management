import { BaseRepository } from "src/repository/base.repository";
import { BaseRepositoryInterface } from "src/repository/base.repository.interfact";
import { Role } from "../role.entity";


export const ROLE_REPOSITORY = 'ROLE_REPOSITORY';
export interface IRoleRepository extends BaseRepositoryInterface<Role> {

}