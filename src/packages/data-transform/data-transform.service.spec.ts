import { Test, TestingModule } from '@nestjs/testing';
import { DataTransformService } from './data-transform.service';
import { ProviderATransform } from './providers/provider-a.transform';
import { ProviderBTransform } from './providers/provider-b.transform';

describe('DataTransformService', () => {
	let service: DataTransformService;
	let providerA: ProviderATransform;
	let providerB: ProviderBTransform;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				DataTransformService,
				ProviderATransform,
				ProviderBTransform,
			],
		}).compile();

		service = module.get<DataTransformService>(DataTransformService);
		providerA = module.get<ProviderATransform>(ProviderATransform);
		providerB = module.get<ProviderBTransform>(ProviderBTransform);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('providerA be defined', () => {
		expect(providerA).toBeDefined();
	});

	it('providerB be defined', () => {
		expect(providerB).toBeDefined();
	});

	describe('ProviderATransform', () => {
		it('should transform data correctly', () => {
			const mockData = {
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

			service.setTransform(providerA);
			const result = service.transform(mockData);
			expect(result).toEqual([
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
				},
			]);
		});
	});

	describe('ProviderBTransform', () => {
		it('should transform data correctly', () => {
			const mockData = {
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

			service.setTransform(providerB);
			const result = service.transform(mockData);
			expect(result).toEqual([
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
				},
			]);
		});
	});
});
