import { IsString, IsObject, ValidateNested, IsNumber, Min, IsOptional } from 'class-validator';

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

export class ProjectCreateDTO {
	@IsString()
	projectName: string;

	@IsString()
	@IsOptional()
	projectDescription?: string;

	@IsObject()
	@ValidateNested()
	salary: SalaryDTO;
}
