import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Tracker, TrackerDocument } from './schemas/tracker.schema';
import { BaseRepository } from 'src/common/baseRepository/base.repository';

@Injectable()
export class TrackerRepository extends BaseRepository<TrackerDocument> {
	constructor(@InjectModel(Tracker.name) private trackerModel: Model<TrackerDocument>) {
		super(trackerModel);
		console.log(trackerModel);
	}

	async findOne(userId: string, date: string): Promise<Tracker | null> {
		return await this.trackerModel.findOne({ userId, date }).exec();
	}

	async findManyByMonth(userId: string, date: string): Promise<Tracker[] | null> {
		const dateObj = new Date(date);
		const month = dateObj.getMonth() + 1;
		return await this.trackerModel
			.find({
				userId,
				$expr: {
					$eq: [{ $month: '$date' }, month],
				},
			})
			.exec();
	}
	async findAll(): Promise<TrackerDocument[]> {
		return await this.trackerModel.find({}).exec();
	}
}
