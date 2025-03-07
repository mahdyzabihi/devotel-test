import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobOfferQuery } from './queries/job-offer.query';

describe('AppController', () => {
	let appController: AppController;
	let appService: AppService;

	const mockAppService = {
		jobOffers: jest.fn().mockResolvedValue({
			data: [
				{
					title: 'Software Engineer',
					location: 'Seattle, WA',
					minSalary: 60000,
					maxSalary: 106000,
				},
			],
		}),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [
				{
					provide: AppService,
					useValue: mockAppService,
				},
			],
		}).compile();

		appController = module.get<AppController>(AppController);
		appService = module.get<AppService>(AppService);
	});

	it('should be defined', () => {
		expect(appController).toBeDefined();
	});

	it('should return job offers', async () => {
		const query: JobOfferQuery = {
			title: 'Software Engineer',
			location: 'Seattle, WA',
			minSalary: 60000,
			maxSalary: 106000,
			page: 1,
			limit: 10,
		};

		const result = await appController.jobOffers(query);

		expect(result).toEqual({
			data: [
				{
					title: 'Software Engineer',
					location: 'Seattle, WA',
					minSalary: 60000,
					maxSalary: 106000,
				},
			],
		});

		expect(mockAppService.jobOffers).toHaveBeenCalledWith(query);
	});
});
