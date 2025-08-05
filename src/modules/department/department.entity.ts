import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Student } from "../student/student.entity";

@Entity()
export class Department {
    // Define your entity properties here
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'nvarchar',
        length: 100,
    })
    name: string;

    @Column({
        type: 'nvarchar',
        length: 255,
        nullable: true,
    })
    description: string;
    
    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @OneToMany(() => Student, (student) => student.department)
    students: Student[];
}