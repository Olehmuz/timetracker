import { Body, Controller, Param, Post } from '@nestjs/common';
import { TrackerService } from './tracker.service';
import { TrackerDTO } from './dto/tracker.dto';
import { Tracker } from './schemas/tracker.schema';
import { Public } from './../common/decorators/public.decorator';
import { TrackerGetDTO } from './dto/tracker-info.dto';
@Public()
@Controller('tracker')
export class TrackerController {
	constructor(private readonly trackerService: TrackerService) {}
	@Post()
	async trackWorkingHours(@Body() dto: TrackerDTO): Promise<Tracker> {
		return await this.trackerService.trackWorkingHours(dto);
	}
	@Post('/day')
	async getWorkingHoursByDay(@Body() dto: TrackerGetDTO): Promise<number> {
		return await this.trackerService.getWorkingHoursByDay(dto);
	}
	@Post('/week')
	async getWorkingHoursByWeek(@Body() dto: TrackerGetDTO): Promise<number> {
		return await this.trackerService.getWorkingHoursByWeek(dto.userId, dto.date);
	}
	@Post('/week/daylist')
	async getWorkingDays(@Body() dto: TrackerGetDTO): Promise<Tracker[]> {
		return await this.trackerService.getWorkingDays(dto.userId, dto.date);
	}
	@Post('/week/workingHours')
	async getMaxWorkingHoursByWeek(@Body() dto: TrackerGetDTO): Promise<number> {
		return await this.trackerService.getMaxWorkingHoursByWeek(dto.userId, dto.date);
	}
	@Post('/month')
	async getWorkingHoursByMonth(@Body() dto: { userId: string; date: string }): Promise<number> {
		return await this.trackerService.getWorkingHoursByMonth(dto.userId, dto.date);
	}
}

//GetVacationDays
//GetMonthLimitByMonth
//GetTrackedTimeByMonth
//GetTrackedTimeByDay
//setTrackedTimeOnDay
//patchTrackedTimeOnDay
