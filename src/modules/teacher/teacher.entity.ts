import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Department } from "../department/department.entity";

@Entity() 
export class Teacher {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'nvarchar',
        nullable: false,
        length: 100,
    })
    firstName: string;

    @Column({
        type: 'nvarchar',
        nullable: false,
        length: 100,
    })
    lastName: string;
    @Column({
        type: 'varchar',
        unique: true,
        length: 255,
    })
    email: string;
    @Column({
        type: 'int',
        nullable: false,
    })
    salary: number;
    @CreateDateColumn()
    createdDate: Date;
    @UpdateDateColumn()
    updatedDate: Date;

    @ManyToMany(() => Department)
    @JoinTable()
    departments: Department[];
}