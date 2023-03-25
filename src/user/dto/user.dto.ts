import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDTO {
	@IsNotEmpty()
	@IsEmail()
	@IsString()
	email: string;

	@IsNotEmpty()
	@IsString()
	googleId: string;

	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsString()
	surname: string;

	@IsNotEmpty()
	@IsString()
	picture: string;
}
