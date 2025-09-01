import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RoleRepository } from './role.repository';

@Module({
    controllers: [RoleController],
    providers: [RoleService, RoleRepository],
    imports: [
        TypeOrmModule.forFeature([Role])
    ],
    exports: [RoleService]
})
export class RoleModule { }
