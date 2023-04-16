import { Body, Controller, Param, Post } from '@nestjs/common';
import { TrackerService } from './tracker.service';
import { TrackerDTO } from './dto/tracker.dto';
import { Tracker } from './schemas/tracker.schema';
import { Public } from 'src/common/decorators/public.decorator';
@Public()
@Controller('tracker')
export class TrackerController {
	constructor(private readonly trackerService: TrackerService) {}
	@Post()
	async trackWorkingHours(@Body() dto: TrackerDTO): Promise<Tracker> {
		return await this.trackerService.trackWorkingHours(dto);
	}

	@Post('/day')
	async getWorkingHoursByDay(@Body() dto: TrackerDTO): Promise<number> {
		return await this.trackerService.getWorkingHoursByDay(dto);
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
