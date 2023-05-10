import { Body, Controller, Get, Post } from '@nestjs/common';

import { Public } from 'src/common/decorators/public.decorator';

import { ManagementService } from './management.service';
import { ProjectCreateDTO } from './dto/project-post.dto';
import { ProjectDocument } from './schemas/project.schema';

@Public()
@Controller('management')
export class ManagementController {
	constructor(private readonly managementService: ManagementService) {}
	@Post('create')
	async createProject(@Body() dto: ProjectCreateDTO): Promise<ProjectDocument> {
		return await this.managementService.createProject(dto);
	}
	@Get('projects')
	async getProjects(): Promise<ProjectDocument[]> {
		return await this.managementService.getListOfProjects();
	}
}
