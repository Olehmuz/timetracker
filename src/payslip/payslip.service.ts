import { Injectable } from '@nestjs/common';
import { ManagementService } from './../management/management.service';
import { PositionDocument } from './../management/schemas/position.schema';
import { ProjectDocument } from './../management/schemas/project.schema';

@Injectable()
export class PayslipService {
	constructor(private readonly managementService: ManagementService) {}

	async calcMonthlyRate(userId: string): Promise<number> {
		const filter = { userId };
		const gradePromise = this.managementService.getGrade(userId);
		const activePositionPromise = this.managementService.getActiveEntity<PositionDocument>(
			'positionId',
			'positionRepository',
			filter,
		);
		const activeProjectPromise = this.managementService.getActiveEntity<ProjectDocument>(
			'projectId',
			'managementRepository',
			filter,
		);

		console.log(activePositionPromise, activeProjectPromise);
		const [activePosition, activeProject, grade] = await Promise.all([
			activePositionPromise,
			activeProjectPromise,
			gradePromise,
		]);
		console.log(activePosition, activeProject);
		return activePosition.salary[grade] * 0.4 + activeProject.salary[grade] * 0.6;
	}
}
