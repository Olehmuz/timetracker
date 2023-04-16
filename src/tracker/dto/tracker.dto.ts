import { IsDate, IsDateString, IsNumber, IsString, Max } from 'class-validator';

export class TrackerDTO {
	@IsString()
	userId: string;
	@IsDateString()
	date: string;
	@IsNumber()
	@Max(8)
	trackedTime: number;
}
