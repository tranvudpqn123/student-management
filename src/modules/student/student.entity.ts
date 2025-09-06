import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Department } from "../department/department.entity";
import { Role } from "../role/role.entity";
import { Users } from "../user/user.entity";

@Entity()
export class Student {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'nvarchar',
        nullable: false,
        length: 100,
    })
    name: string;

    @Column({
        type: 'int',
        nullable: false,
    })
    age: number;

    @Column({
        type: 'nvarchar',
        nullable: false,
        length: 100,
    })
    major: string;

    @Column({
        type: 'varchar',
        unique: true,
        length: 255,
    })
    email: string;

    @CreateDateColumn()
    createdDate: Date;

    @ManyToOne(() => Users)
    @JoinColumn({ name: 'created_by' })
    createdBy: Users;

    @UpdateDateColumn()
    updatedDate: Date;

    @ManyToOne(() => Users)
    @JoinColumn({ name: 'updated_by' })
    updatedBy: Users;

    @Column({ nullable: true, name: 'department_id' })
    departmentId: string;

    @ManyToOne(() => Department, (department) => department.students)
    @JoinColumn({name: 'department_id'})
    department: Department;
}