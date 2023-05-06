import { IsDateString, IsString } from 'class-validator';

export class TrackerGetDTO {
	@IsString()
	userId: string;
	@IsDateString()
	date: string;
}
