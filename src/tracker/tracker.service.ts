import { Injectable } from '@nestjs/common';
import { Tracker } from './schemas/tracker.schema';
import { TrackerDTO } from './dto/tracker.dto';
import { TrackerRepository } from './tracker.repository';

//GetVacationDays
//GetMonthLimitByMonth
//GetTrackedTimeByMonth
//GetTrackedTimeByDay
//setTrackedTimeOnDay
//patchTrackedTimeOnDay

@Injectable()
export class TrackerService {
	constructor(private readonly trackerRepository: TrackerRepository) {}
	async trackWorkingHours(dto: TrackerDTO): Promise<Tracker> {
		if (await this.trackerRepository.findOne(dto.userId, dto.date)) {
			return this.trackerRepository.updateOne(dto);
		}
		return this.trackerRepository.insertOne(dto);
	}

	async getVacationDays(userId: string): Promise<number> {
		return 1;
	}

	async getWorkingHoursByDay(dto: TrackerDTO): Promise<number> {
		const { trackedTime } = await this.trackerRepository.findOne(dto.userId, dto.date);
		return trackedTime;
	}
	async getWorkingHoursByMonth(userId: string, date: string): Promise<number> {
		const recordByMonth = await this.trackerRepository.findManyByMonth(userId, date);
		let workingHoursByMonth = 0;
		if (recordByMonth) {
			workingHoursByMonth = recordByMonth.reduce((acc, curr) => acc + curr.trackedTime, 0);
		}
		return workingHoursByMonth;
	}
}
