import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}