import { BaseRepository } from "src/repository/base.repository";
import { Subject } from "../subject.entity";

export const SUBJECT_REPOSITORY = 'SUBJECT_REPOSITORY';
export interface ISubjectRepository extends BaseRepository<Subject> {}