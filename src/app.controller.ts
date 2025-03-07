import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { JobOfferQuery } from './queries/job-offer.query';

@ApiTags('Application')
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('/job-offers')
	async jobOffers(@Query() query: JobOfferQuery) {
		return await this.appService.jobOffers(query);
	}
}
