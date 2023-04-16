import { BadRequestException, Injectable } from '@nestjs/common';
import { Tracker, TrackerDocument } from './schemas/tracker.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TrackerDTO } from './dto/tracker.dto';

@Injectable()
export class TrackerRepository {
	constructor(@InjectModel(Tracker.name) private trackerModel: Model<Tracker>) {}
	async insertOne(dto: TrackerDTO): Promise<Tracker> {
		if (await this.findOne(dto.userId, dto.date)) {
			throw new BadRequestException('Working hours for this day have already been tracked.');
		}
		const newTrackerRecord = new this.trackerModel({
			userId: dto.userId,
			date: dto.date,
			trackedTime: dto.trackedTime,
		});
		return newTrackerRecord.save();
	}
	async updateOne(dto: TrackerDTO): Promise<Tracker> {
		if (!(await this.findOne(dto.userId, dto.date))) {
			throw new BadRequestException(
				'No record of working time tracking for this day was found.',
			);
		}
		const updatedUser = await this.trackerModel
			.findOneAndUpdate(
				{
					userId: dto.userId,
					date: dto.date,
				},
				{
					trackedTime: dto.trackedTime,
				},
				{
					new: true,
				},
			)
			.exec();
		return updatedUser;
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
