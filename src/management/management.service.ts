import { Injectable } from '@nestjs/common';

import {
	ACTIVE_PROJECT_NOT_FOUND,
	PROJECT_ALREADY_EXIST,
	PROJECT_NOT_FOUND,
} from './project.constants';

import { ProjectCreateDTO } from './dto/project-post.dto';
import { ManagementRepository } from './management.repository';
import { ProjectDocument } from './schemas/project.schema';
import { UserProjectRepository } from './user-project.repository';
import { UserProjectDTO } from './dto/user-project.dto';
import { UserProjectDocument } from './schemas/user-project.schema';

@Injectable()
export class ManagementService {
	constructor(
		private readonly managementRepository: ManagementRepository,
		private readonly userProjectRepository: UserProjectRepository,
	) {}
	async createProject(dto: ProjectCreateDTO): Promise<ProjectDocument> {
		const existedProject = await this.managementRepository.findOneByFilter({
			projectName: dto.projectName,
		});
		if (existedProject) {
			throw new Error(PROJECT_ALREADY_EXIST);
		}
		return await this.managementRepository.create(dto);
	}
	async getListOfProjects(): Promise<ProjectDocument[]> {
		return await this.managementRepository.findAll();
	}
	async getProject(projectId: string): Promise<ProjectDocument> {
		const project = await this.managementRepository.findById(projectId);
		if (!project) {
			throw new Error(PROJECT_NOT_FOUND);
		}
		return project;
	}

	async setActiveProject(dto: UserProjectDTO): Promise<UserProjectDocument> {
		if (await this.userProjectRepository.findOneByFilter({ userId: dto.userId })) {
			return await this.userProjectRepository.update(
				{ userId: dto.userId },
				{ projectId: dto.projectId },
			);
		}
		return await this.userProjectRepository.create(dto);
	}

	async getActiveProject(userId: string): Promise<UserProjectDocument> {
		const activeProject = await this.userProjectRepository.findOneByFilter({ userId });
		if (!activeProject) {
			throw new Error(ACTIVE_PROJECT_NOT_FOUND);
		}
		return activeProject;
	}
	// async removeProject() {}
	// async changeProject() {}
}
