import { DeleteResult, FindOptionsWhere, UpdateResult } from "typeorm";

export interface BaseRepositoryInterface<T> {
    create(data: T | any): Promise<T[]>;
    findAll(skip: number, take: number, relations: string[], where: FindOptionsWhere<T> | null): Promise<{ items: T[]; totalElements: number; itemsPerPage: number; currentPage: number  }>;
    findById(id: string, relations?: string[]): Promise<T | null>;
    update(id: string, data: Partial<T>): Promise<UpdateResult>;
    delete(id: string): Promise<DeleteResult>;
    findOneBy(criteria: Partial<T>): Promise<T | null>;
    findBy(criteria: Partial<T>): Promise<T[]>;
    findByCondition(filterCondition: any): Promise<T | null>;
    findByIds(ids: string[]): Promise<T[]>;

}