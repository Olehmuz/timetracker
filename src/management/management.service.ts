import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';

import {
	ACTIVE_PROJECT_NOT_FOUND,
	PROFILE_NOT_FOUND,
	PROJECT_ALREADY_EXIST,
	PROJECT_NOT_FOUND,
} from './project.constants';

import { ProjectDocument } from './schemas/project.schema';
import { PositionDocument } from './schemas/position.schema';
import { UserProfileDocument } from './schemas/userProfile.schema';

import { ManagementRepository } from './management.repository';
import { UserProfileRepository } from './userProfile.repository';
import { PositionRepository } from './position.repository';

import { PositionCreateDTO } from './dto/position.dto';
import { ProjectCreateDTO } from './dto/project-post.dto';
import { GradeDTO } from './dto/grade.dto';
import { Grades } from './types/grades.type';

@Injectable()
export class ManagementService {
	constructor(
		private readonly managementRepository: ManagementRepository,
		private readonly userProfileRepository: UserProfileRepository,
		private readonly positionRepository: PositionRepository,
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

	async createPosition(dto: PositionCreateDTO): Promise<PositionDocument> {
		const existedProject = await this.managementRepository.findOneByFilter({
			projectName: dto.positionName,
		});
		if (existedProject) {
			throw new Error(PROJECT_ALREADY_EXIST);
		}
		return await this.positionRepository.create(dto);
	}

	// async createActiveProfile<T extends { userId: string }>(dto: T): Promise<UserProfileDocument> {
	// 	const userProfile = await this.userProfileRepository.findOneByFilter({
	// 		userId: dto.userId,
	// 	});
	// 	if (userProfile) {
	// 		throw new Error(PROJECT_ALREADY_EXIST);
	// 	}
	// 	return await this.userProfileRepository.create(dto);
	// }

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

	async getGrade(userId: string): Promise<Grades> {
		const profile = await this.userProfileRepository.findOneByFilter({ userId });
		if (!profile) {
			throw new Error(PROFILE_NOT_FOUND);
		}
		return profile.grade;
	}

	async setGrade(dto: GradeDTO): Promise<UserProfileDocument> {
		const profile = await this.userProfileRepository.findOneByFilter({ userId: dto.userId });
		if (!profile) {
			throw new Error(PROFILE_NOT_FOUND);
		}
		if (profile.grade === dto.grade) {
			return profile;
		}
		return await this.userProfileRepository.update(
			{ userId: dto.userId },
			{ grade: dto.grade },
		);
	}

	async setActiveEntity<DTO extends { userId: string }>(
		dto: DTO,
		entityKey: string,
	): Promise<UserProfileDocument> {
		if (await this.userProfileRepository.findOneByFilter({ userId: dto.userId })) {
			return await this.userProfileRepository.update(
				{ userId: dto.userId },
				{ [entityKey]: dto[entityKey] },
			);
		}
		return await this.userProfileRepository.create(dto);
	}

	async getActiveEntity<Doc>(
		entityKey: string,
		repositryName: string,
		filter: FilterQuery<Doc>,
	): Promise<Doc> {
		const entity = await this.userProfileRepository.findOneByFilter(filter);
		const activeEntity = (await this[repositryName].findById(entity[entityKey])) as Doc;
		if (!activeEntity) {
			throw new Error(ACTIVE_PROJECT_NOT_FOUND);
		}
		return activeEntity;
	}

	async getListOfEntites<Doc>(repositoryName: string): Promise<Doc[]> {
		return (await this[repositoryName].findAll()) as Doc[];
	}

	// async removeProject() {}
	// async changeProject() {}
}
