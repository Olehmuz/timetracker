import { Injectable } from '@nestjs/common';
import { Model, Document } from 'mongoose';

@Injectable()
export abstract class BaseRepository<T extends Document> {
	constructor(private readonly model: Model<T>) {}

	async create(data: Partial<T>): Promise<T> {
		const doc = new this.model(data);
		return await doc.save();
	}

	async update(id: string, data: Partial<T>): Promise<T> {
		return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
	}

	async delete(id: string): Promise<T> {
		return await this.model.findByIdAndDelete(id).exec();
	}

	async findOneAndUpdate(filter: Object, data: Object, options?: Object): Promise<T | null> {
		return await this.model.findOneAndUpdate(filter, data).exec();
	}

	async findOneByFilter(filter: Object): Promise<T | null> {
		return await this.model.findOne(filter).exec();
	}

	async findAll(): Promise<T[]> {
		return await this.model.find({}).exec();
	}

	async findById(id: string): Promise<T | null> {
		return await this.model.findById(id).exec();
	}
}
