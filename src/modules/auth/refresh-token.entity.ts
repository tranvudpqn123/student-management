import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "../user/user.entity";

@Entity()
export class RefreshToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column() 
    token: string;

    @OneToOne(() => Users, (user) => user.refreshToken)
    @JoinColumn()
    user: Users;

    @Column()
    expiresAt: Date;

}