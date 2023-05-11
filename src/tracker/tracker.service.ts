import { BadRequestException, Injectable } from '@nestjs/common';

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
	async trackWorkingHours({ userId, date, trackedTime }: TrackerDTO): Promise<Tracker> {
		const workingHoursByMonth = await this.getWorkingHoursByMonth(userId, date);
		if (workingHoursByMonth >= 160) {
			throw new BadRequestException(
				'You have requested the maximum working hours for this month.',
			);
		}
		if (await this.trackerRepository.findOneByFilter({ userId, date })) {
			return this.trackerRepository.update(
				{
					userId,
					date,
				},
				{
					trackedTime,
				},
			);
		}
		return this.trackerRepository.create({
			userId,
			date: new Date(date),
			trackedTime,
		});
	}

	async getWorkingHoursByDay({ userId, date }: TrackerGetDTO): Promise<number> {
		const res = await this.trackerRepository.findOneByFilter({ userId, date });

		if (!res) {
			return 0;
		}
		return res.trackedTime;
	}

	async getWorkingHoursByWeek(userId: string, date: string) {
		return await this.trackerRepository.findManyByWeek(userId, date);
	}

	async getWorkingHoursByMonth(userId: string, date: string): Promise<number> {
		const recordByMonth = await this.trackerRepository.findManyByMonth(userId, date);
		let workingHoursByMonth = 0;
		if (recordByMonth) {
			workingHoursByMonth = recordByMonth.reduce((acc, curr) => acc + curr.trackedTime, 0);
		}
		return workingHoursByMonth;
	}

	async getVacationDays(userId: string): Promise<number> {
		return 1;
	}
}
