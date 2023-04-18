import { Injectable } from '@nestjs/common';
import { ManagementRepository } from './management.repository';
import { ProjectCreateDTO } from './dto/project-post.dto';
import { ProjectDocument } from './schemas/project.schema';
import { PROJECT_ALREADY_EXIST, PROJECT_NOT_FOUND } from './project.constants';

@Injectable()
export class ManagementService {
	constructor(private readonly managementRepository: ManagementRepository) {}
	async createProject(dto: ProjectCreateDTO): Promise<ProjectDocument> {
		const existedProject = await this.managementRepository.findOneByFilter({
			projectName: dto.projectName,
		});
		if (existedProject) {
			throw new Error(PROJECT_ALREADY_EXIST);
		}
		return await this.managementRepository.create(dto);
	}
	async removeProject() {}
	async changeProject() {}
	async getListOfProjects(): Promise<ProjectDocument[]> {
		return await this.managementRepository.findAll();
	}
	async getProject(projectId: string): Promise<ProjectDocument> {
		const project = await this.managementRepository.findById(projectId);
		if (project) {
			throw new Error(PROJECT_NOT_FOUND);
		}
		return project;
	}
}