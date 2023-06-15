import { Test, TestingModule } from '@nestjs/testing';
import { PayslipService } from './payslip.service';
import { ManagementService } from './../management/management.service';
import { ManagementRepository } from './../management/management.repository';
import { UserProfileRepository } from './../management/userProfile.repository';
import { ManagementModule } from './../management/management.module';
import { Types } from 'mongoose';

describe('PayslipService', () => {
	let service: PayslipService;
	const managmentService = {
		getGrade: jest.fn().mockReturnValue(Promise.resolve('senior')),
		getActiveEntity: jest.fn().mockImplementation(async (entityKey, repositoryName, filter) => {
			if (repositoryName === 'positionRepository') {
				return Promise.resolve({
					_id: new Types.ObjectId('647126fe7c77c43231609960'),
					positionName: 'QA',
					salary: { junior: 400, middle: 1100, senior: 2050 },
					__v: 0,
				});
			} else if (repositoryName === 'managementRepository') {
				return Promise.resolve({
					_id: new Types.ObjectId('643ef95ce96b58e070127437'),
					projectName: 'ITFin12',
					salary: { junior: 600, middle: 1400, senior: 3200 },
					__v: 0,
				});
			}
		}),
	};
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PayslipService,
				{
					provide: ManagementService,
					useValue: managmentService,
				},
			],
		}).compile();

		service = module.get<PayslipService>(PayslipService);
	});

	it('Salry calculation - success', async () => {
		const salary = await service.calcMonthlyRate('123');
		expect(salary).toBe(2740);
	});
});
