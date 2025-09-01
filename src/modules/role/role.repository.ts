import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/repository/base.repository";
import { Role } from "./role.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class RoleRepository extends BaseRepository<Role> {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>

    ) {
        super(roleRepository);
    }
}