import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '../common/baseRepository/base.repository';
import { Position, PositionDocument } from './schemas/position.schema';

@Injectable()
export class PositionRepository extends BaseRepository<PositionDocument> {
	constructor(
		@InjectModel(Position.name) private readonly projectModel: Model<PositionDocument>,
	) {
		super(projectModel);
	}
}
