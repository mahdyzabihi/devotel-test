import { Test, TestingModule } from '@nestjs/testing';
import { WorkerService } from './worker.service';
import { ApiService } from '../api/api.service';
import { DatabaseService } from '../database/database.service';
import { DataTransformService } from '../data-transform/data-transform.service';
import { ProviderATransform } from '../data-transform/providers/provider-a.transform';
import { ProviderBTransform } from '../data-transform/providers/provider-b.transform';
import { JobType } from '../data-transform/types/job.type';

describe('WorkerService', () => {
	let workerService: WorkerService;
	let apiService: ApiService;
	let databaseService: DatabaseService;
	let providerATransform: ProviderATransform;
	let providerBTransform: ProviderBTransform;
	let dataTransformService: DataTransformService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				WorkerService,
				{
					provide: ApiService,
					useValue: {
						getProviderA: jest.fn(),
						getProviderB: jest.fn(),
					},
				},
				{
					provide: DatabaseService,
					useValue: {
						bulkInsertAsync: jest.fn(),
					},
				},
				{
					provide: DataTransformService,
					useValue: {
						setTransform: jest.fn(),
						transform: jest.fn(),
					},
				},
				{
					provide: ProviderATransform,
					useValue: {
						transform: jest.fn(),
					},
				},
				{
					provide: ProviderBTransform,
					useValue: {
						transform: jest.fn(),
					},
				},
			],
		}).compile();

		workerService = module.get<WorkerService>(WorkerService);
		apiService = module.get<ApiService>(ApiService);
		databaseService = module.get<DatabaseService>(DatabaseService);
		providerATransform = module.get<ProviderATransform>(ProviderATransform);
		providerBTransform = module.get<ProviderBTransform>(ProviderBTransform);
		dataTransformService =
			module.get<DataTransformService>(DataTransformService);
	});

	it('should be defined', () => {
		expect(workerService).toBeDefined();
	});

	it('should fetch and process data for Provider A', async () => {
		const mockData = {
			metadata: {
				requestId: 'req-edq9hfe2o',
				timestamp: '2025-03-07T15:39:01.203Z',
			},
			jobs: [
				{
					jobId: 'P1-81',
					title: 'Data Scientist',
					details: {
						location: 'New York, NY',
						type: 'Contract',
						salaryRange: '$62k - $133k',
					},
					company: {
						name: 'DataWorks',
						industry: 'Analytics',
					},
					skills: ['Java', 'Spring Boot', 'AWS'],
					postedDate: '2025-03-05T08:23:07.977Z',
				},
			],
		};
		const transformedData: JobType[] = [
			{
				id: 'P1-81',
				title: 'Data Scientist',
				location: 'New York, NY',
				type: 'Contract',
				minSalary: 62000,
				maxSalary: 133000,
				currency: '$',
				companyName: 'DataWorks',
				companyIndustry: 'Analytics',
				skills: ['Java', 'Spring Boot', 'AWS'],
				postedDate: '2025-03-05T08:23:07.977Z',
			} as JobType,
		];

		jest.spyOn(apiService, 'getProviderA').mockResolvedValue(mockData);
		jest.spyOn(dataTransformService, 'transform').mockReturnValue(
			transformedData,
		);
		jest.spyOn(databaseService, 'bulkInsertAsync').mockResolvedValue(
			undefined,
		);

		await workerService['providerA']();

		expect(apiService.getProviderA).toHaveBeenCalled();
		expect(dataTransformService.setTransform).toHaveBeenCalledWith(
			providerATransform,
		);
		expect(dataTransformService.transform).toHaveBeenCalledWith(mockData);
		expect(databaseService.bulkInsertAsync).toHaveBeenCalledWith(
			transformedData,
		);
	});

	it('should fetch and process data for Provider B', async () => {
		const mockData = {
			status: 'success',
			data: {
				jobsList: {
					'job-479': {
						position: 'Backend Engineer',
						location: {
							city: 'Seattle',
							state: 'WA',
							remote: true,
						},
						compensation: {
							min: 53000,
							max: 115000,
							currency: 'USD',
						},
						employer: {
							companyName: 'TechCorp',
							website: 'https://creativedesign ltd.com',
						},
						requirements: {
							experience: 5,
							technologies: ['HTML', 'CSS', 'Vue.js'],
						},
						datePosted: '2025-03-05',
					},
				},
			},
		};
		const transformedData: JobType[] = [
			{
				id: 'job-479',
				title: 'Backend Engineer',
				location: 'Seattle, WA',
				type: 'Remote',
				minSalary: 53000,
				maxSalary: 115000,
				currency: 'USD',
				companyName: 'TechCorp',
				companyWebsite: 'https://creativedesign ltd.com',
				experience: 5,
				skills: ['HTML', 'CSS', 'Vue.js'],
				postedDate: '2025-03-05',
			} as JobType,
		];

		jest.spyOn(apiService, 'getProviderB').mockResolvedValue(mockData);
		jest.spyOn(dataTransformService, 'transform').mockReturnValue(
			transformedData,
		);
		jest.spyOn(databaseService, 'bulkInsertAsync').mockResolvedValue(
			undefined,
		);

		await workerService['providerB']();

		expect(apiService.getProviderB).toHaveBeenCalled();
		expect(dataTransformService.setTransform).toHaveBeenCalledWith(
			providerBTransform,
		);
		expect(dataTransformService.transform).toHaveBeenCalledWith(mockData);
		expect(databaseService.bulkInsertAsync).toHaveBeenCalledWith(
			transformedData,
		);
	});
});
