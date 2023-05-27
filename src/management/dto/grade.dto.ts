import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { Grades } from '../types/grades.type';

export class GradeDTO {
	@IsString()
	@IsNotEmpty()
	userId: string;

	@IsString()
	@IsIn(['junior', 'middle', 'senior'])
	grade: Grades;
}
