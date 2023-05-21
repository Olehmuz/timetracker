import { IsNotEmpty, IsString } from 'class-validator';

export class UserProjectDTO {
	@IsNotEmpty()
	@IsString()
	userId: string;

	@IsNotEmpty()
	@IsString()
	projectId: string;
}
