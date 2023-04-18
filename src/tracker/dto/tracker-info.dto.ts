import { IsDateString, IsString } from 'class-validator';

export class TrackerDTO {
	@IsString()
	userId: string;
	@IsDateString()
	date: string;
}
