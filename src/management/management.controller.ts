import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { Public } from './../common/decorators/public.decorator';

import { ManagementService } from './management.service';
import { ProjectCreateDTO } from './dto/project-post.dto';
import { ProjectDocument } from './schemas/project.schema';
import { UserProjectDTO } from './dto/user-project.dto';
import { UserProfileDocument } from './schemas/userProfile.schema';
import { PositionCreateDTO, UserPositionDTO } from './dto/position.dto';
import { UserPositionDocument } from './schemas/user-position.schema';
import { PositionDocument } from './schemas/position.schema';

@Public()
@Controller('management')
export class ManagementController {
	constructor(private readonly managementService: ManagementService) {}
	@Post('create/project')
	async createProject(@Body() dto: ProjectCreateDTO): Promise<ProjectDocument> {
		return await this.managementService.createProject(dto);
	}

	@Post('create/position')
	async createPosition(@Body() dto: PositionCreateDTO): Promise<PositionDocument> {
		return await this.managementService.createPosition(dto);
	}

	@Post('setActiveProject')
	async setActiveProject(@Body() dto: UserProjectDTO): Promise<UserProfileDocument> {
		return await this.managementService.setActiveEntity(dto, 'projectId');
	}

	@Post('setActivePosition')
	async setActivePosition(@Body() dto: UserPositionDTO): Promise<UserProfileDocument> {
		return await this.managementService.setActiveEntity(dto, 'positionId');
	}

	@Get('getActiveProject/:userId')
	async getActiveProject(@Param('userId') userId: string): Promise<ProjectDocument> {
		const filter = { userId };
		return await this.managementService.getActiveEntity<ProjectDocument>(
			'projectId',
			'managementRepository',
			filter,
		);
	}

	@Get('getActivePosition/:userId')
	async getActivePosition(@Param('userId') userId: string): Promise<PositionDocument> {
		const filter = { userId };
		return await this.managementService.getActiveEntity<PositionDocument>(
			'positionId',
			'positionRepository',
			filter,
		);
	}

	@Get('projects')
	async getProjects(): Promise<ProjectDocument[]> {
		return await this.managementService.getListOfEntites('managementRepository');
	}

	@Get('positions')
	async getPositions(): Promise<PositionDocument[]> {
		return await this.managementService.getListOfEntites('positionRepository');
	}
}
