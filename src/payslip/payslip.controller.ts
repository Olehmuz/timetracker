import { Body, Controller, Post } from '@nestjs/common';
import { PayslipService } from './payslip.service';
import { Public } from 'src/common/decorators/public.decorator';
import { PayslipDTO } from './payslip.dto';

@Public()
@Controller('payslip')
export class PayslipController {
	constructor(private readonly payslipService: PayslipService) {}

	@Post('rate')
	async getMonthlyRate(@Body() dto: PayslipDTO) {
		return this.payslipService.calcMonthlyRate(dto.userId);
	}
}
