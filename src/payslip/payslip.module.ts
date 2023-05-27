import { Module } from '@nestjs/common';
import { PayslipController } from './payslip.controller';
import { PayslipService } from './payslip.service';
import { ManagementModule } from 'src/management/management.module';

@Module({
	controllers: [PayslipController],
	providers: [PayslipService],
	imports: [ManagementModule],
})
export class PayslipModule {}
