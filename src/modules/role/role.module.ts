import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RoleRepository } from './role.repository';
import { ROLE_REPOSITORY } from './interfaces/interface.repository.interface';

@Module({
    controllers: [RoleController],
    providers: [RoleService, 
        {
            provide: ROLE_REPOSITORY,
            useClass: RoleRepository
        }
    ],
    imports: [
        TypeOrmModule.forFeature([Role])
    ],
    exports: [RoleService]
})
export class RoleModule { }
