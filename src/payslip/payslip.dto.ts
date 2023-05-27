import { IsNotEmpty, IsString } from 'class-validator';

export class PayslipDTO {
	@IsString()
	@IsNotEmpty()
	userId: string;
}
