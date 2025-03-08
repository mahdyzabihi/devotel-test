import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobOfferQuery } from './queries/job-offer.query';

describe('AppController', () => {
	let appController: AppController;
	let appService: AppService;

	const mockAppService = {
		jobOffers: jest.fn().mockResolvedValue({
			code: 200,
			time: 1741423976061,
			data: {
				list: [
					{
						created_date: '2025-03-08 12:17:00.694647',
						updated_date: '2025-03-08 12:17:00.694647',
						deleted_date: null,
						id: 'job-218',
						title: 'Backend Engineer',
						location: 'Seattle, NY',
						type: 'Remote',
						minSalary: 71000,
						maxSalary: 113000,
						currency: 'USD',
						companyName: 'Creative Design Ltd',
						companyIndustry: null,
						companyWebsite: 'https://dataworks.com',
						experience: 4,
						skills: ['HTML', 'CSS', 'Vue.js'],
						postedDate: '2025-03-04',
					},
				],
				total: 1,
				page: 1,
				limit: 10,
			},
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
			title: 'back',
			location: 'NY',
			minSalary: 60000,
			maxSalary: 106000,
			page: 1,
			limit: 10,
		};

		const result = await appController.jobOffers(query);

		expect(result).toEqual({
			code: 200,
			time: 1741423976061,
			data: {
				list: [
					{
						created_date: '2025-03-08 12:17:00.694647',
						updated_date: '2025-03-08 12:17:00.694647',
						deleted_date: null,
						id: 'job-218',
						title: 'Backend Engineer',
						location: 'Seattle, NY',
						type: 'Remote',
						minSalary: 71000,
						maxSalary: 113000,
						currency: 'USD',
						companyName: 'Creative Design Ltd',
						companyIndustry: null,
						companyWebsite: 'https://dataworks.com',
						experience: 4,
						skills: ['HTML', 'CSS', 'Vue.js'],
						postedDate: '2025-03-04',
					},
				],
				total: 1,
				page: 1,
				limit: 10,
			},
		});

		expect(mockAppService.jobOffers).toHaveBeenCalledWith(query);
	});
});
