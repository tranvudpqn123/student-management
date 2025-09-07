import { BaseRepository } from "src/repository/base.repository";
import { Teacher } from "../teacher.entity";

export const TEACHER_REPOSITORY = 'TEACHER_REPOSITORY';

export class ITeacherRepository extends BaseRepository<Teacher> {}