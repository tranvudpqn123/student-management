import { BaseRepositoryInterface } from "src/repository/base.repository.interfact";
import { Department } from "../department.entity";

export const DEPARTMENT_REPOSITORY = 'DEPARTMENT_REPOSITORY';
export interface IDepartmentRepository extends BaseRepositoryInterface<Department> {

}