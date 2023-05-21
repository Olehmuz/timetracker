import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { Public } from './../common/decorators/public.decorator';

import { ManagementService } from './management.service';
import { ProjectCreateDTO } from './dto/project-post.dto';
import { ProjectDocument } from './schemas/project.schema';
import { UserProjectDTO } from './dto/user-project.dto';
import { UserProjectDocument } from './schemas/user-project.schema';

@Public()
@Controller('management')
export class ManagementController {
	constructor(private readonly managementService: ManagementService) {}
	@Post('create')
	async createProject(@Body() dto: ProjectCreateDTO): Promise<ProjectDocument> {
		return await this.managementService.createProject(dto);
	}

	@Post('setActiveProject')
	async setActiveProject(@Body() dto: UserProjectDTO): Promise<UserProjectDocument> {
		return await this.managementService.setActiveProject(dto);
	}

	@Get('getActiveProject/:userId')
	async getActiveProject(@Param('userId') userId: string): Promise<UserProjectDocument> {
		console.log(userId);
		return await this.managementService.getActiveProject(userId);
	}

	@Get('projects')
	async getProjects(): Promise<ProjectDocument[]> {
		return await this.managementService.getListOfProjects();
	}
}
