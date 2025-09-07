import { BaseRepositoryInterface } from "src/repository/base.repository.interfact";
import { Users } from "../user.entity";

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface IUserRepository extends BaseRepositoryInterface<Users> {}