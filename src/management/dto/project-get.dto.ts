import { IsDateString, IsString } from 'class-validator';

export class ProjectDTO {
	@IsString()
	userId: string;
	@IsDateString()
	date: string;
}
