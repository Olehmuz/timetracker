import { Injectable } from '@nestjs/common';
import { ManagementService } from 'src/management/management.service';
import { PositionDocument } from 'src/management/schemas/position.schema';
import { ProjectDocument } from 'src/management/schemas/project.schema';
import { TrackerService } from 'src/tracker/tracker.service';

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

		const [activePosition, activeProject, grade] = await Promise.all([
			activePositionPromise,
			activeProjectPromise,
			gradePromise,
		]);

		return activePosition.salary[grade] * 0.4 + activeProject.salary[grade] * 0.6;
	}
}
