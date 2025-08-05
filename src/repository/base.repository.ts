import { DeleteResult, In, ObjectLiteral, Relation, Repository, UpdateResult } from "typeorm";
import { BaseRepositoryInterface } from "./base.repository.interfact";

export abstract class BaseRepository<T extends ObjectLiteral> implements BaseRepositoryInterface<T> {
    constructor(protected readonly repository: Repository<T>) {}

    create(data: T | any): Promise<T[]> {
        console.log('create')
        return this.repository.save(this.repository.create(data));
    }

    async findAll(relations: string[] = []): Promise<T[]> {
        return await this.repository.find({ relations });
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