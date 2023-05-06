import { Injectable } from '@nestjs/common';
import { Tracker } from './schemas/tracker.schema';
import { TrackerDTO } from './dto/tracker.dto';
import { TrackerRepository } from './tracker.repository';
import { TrackerGetDTO } from './dto/tracker-info.dto';

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

	async getWorkingHoursByDay(dto: TrackerGetDTO): Promise<number> {
		const res = await this.trackerRepository.findOne(dto.userId, dto.date);
		if (!res) {
			return 0;
		}
		return res.trackedTime;
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
