import { DeleteResult, FindManyOptions, FindOptionsWhere, In, ObjectLiteral, Relation, Repository, UpdateResult } from "typeorm";
import { BaseRepositoryInterface } from "./base.repository.interfact";

export abstract class BaseRepository<T extends ObjectLiteral> implements BaseRepositoryInterface<T> {
    constructor(protected readonly repository: Repository<T>) {}

    create(data: T | any): Promise<T[]> {
        return this.repository.save(this.repository.create(data));
    }

    async findAll(
        skip: number,
        take: number,
        relations: string[] = [],
        where: FindOptionsWhere<T> | null = null
    ): Promise<{ items: T[]; totalElements: number; itemsPerPage: number; currentPage: number }> {
        const findOptions: FindManyOptions<T> = {}
        if (where) {
            findOptions.where = where;
        }
        if (relations) {
            findOptions.relations = relations;
        }
        const count = await this.repository.count(findOptions);

        findOptions.skip = skip;
        findOptions.take = take;

        return {
            items: await this.repository.find(findOptions),
            totalElements: count,
            itemsPerPage: take,
            currentPage: Math.floor(skip / take) + 1,
        }
    }

    async findById(id: string): Promise<T | null> {
        return await this.findByCondition({ id });
    }

    update(id: string, data: T): Promise<UpdateResult> {
        return this.repository.update(id, data);
    }

    public async delete(id: string | number): Promise<DeleteResult> {
		return this.repository.delete(id);
	}

    async findOneBy(criteria: Partial<T>): Promise<T | null> {
        return await this.repository.findOneBy(criteria);
    }

    async findBy(criteria: Partial<T>): Promise<T[]> {
        return await this.repository.find(criteria);
    }

    async findByIds(ids: string[]): Promise<T[]> {
        return await this.repository.findBy({
            id: In(ids)
        } as any);
    }

    async findByCondition(filterCondition: any): Promise<T | null> {
		return await this.repository.findOne({ where: filterCondition });
	}
}