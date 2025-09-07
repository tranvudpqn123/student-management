import { BaseRepositoryInterface } from "src/repository/base.repository.interfact";
import { Student } from "../student.entity";

export const STUDENT_REPOSITORY = 'STUDENT_REPOSITORY';
export interface IStudentRepository extends BaseRepositoryInterface<Student> {
}