import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../role/role.entity";
import { RefreshToken } from "../auth/entities/refresh-token.entity";

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 24,
        unique: true,
        nullable: false
    })
    username: string;

    @Column({
        type: 'varchar',
        length: 100,
        unique: true,
        nullable: false
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    // Quan hệ: User này được tạo bởi ai
    @ManyToOne(() => Users)
    createdBy: Users;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Users)
    updatedBy: Users;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => Role, (role) => role.users, {eager: true})
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.user)
    refreshToken: RefreshToken;
}