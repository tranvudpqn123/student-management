import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Department } from "../department/department.entity";
import { Role } from "../role/role.entity";

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

    @UpdateDateColumn()
    updatedDate: Date;

    @Column({ nullable: true, name: 'department_id' })
    departmentId: string;

    @ManyToOne(() => Department, (department) => department.students)
    @JoinColumn({name: 'department_id'})
    department: Department;
}