import { IsString } from 'class-validator';

export class ProjectDTO {
	@IsString()
	userId: string;
}
