import {
	IsNotEmpty,
	IsNumber,
	IsObject,
	IsOptional,
	IsString,
	Min,
	ValidateNested,
} from 'class-validator';

export class UserPositionDTO {
	@IsNotEmpty()
	@IsString()
	userId: string;

	@IsNotEmpty()
	@IsString()
	positionId: string;
}

class SalaryDTO {
	@IsNumber()
	@Min(0)
	junior: number;

	@IsNumber()
	@Min(0)
	middle: number;

	@IsNumber()
	@Min(0)
	senior: number;
}

export class PositionCreateDTO {
	@IsString()
	positionName: string;

	@IsString()
	@IsOptional()
	postionDescription?: string;

	@IsObject()
	@ValidateNested()
	salary: SalaryDTO;
}
