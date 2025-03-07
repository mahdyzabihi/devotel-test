import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from './api.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('ApiService', () => {
	let service: ApiService;
	let httpService: HttpService;
	let configService: ConfigService;
	let mockApi: { url: string };

	beforeEach(async () => {
		mockApi = { url: 'mock-api-url' };
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ApiService,
				{
					provide: HttpService,
					useValue: {
						get: jest.fn(),
					},
				},
				{
					provide: ConfigService,
					useValue: {
						get: jest.fn().mockReturnValue(mockApi),
					},
				},
			],
		}).compile();

		service = module.get<ApiService>(ApiService);
		httpService = module.get<HttpService>(HttpService);
		configService = module.get<ConfigService>(ConfigService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('getProviderA', () => {
		it('should return data successfully', async () => {
			const mockResponse: AxiosResponse = {
				data: {
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
						{
							jobId: 'P1-130',
							title: 'Backend Engineer',
							details: {
								location: 'Austin, TX',
								type: 'Contract',
								salaryRange: '$93k - $135k',
							},
							company: {
								name: 'TechCorp',
								industry: 'Design',
							},
							skills: ['JavaScript', 'Node.js', 'React'],
							postedDate: '2025-03-04T02:52:49.621Z',
						},
					],
				},
				status: 200,
				statusText: 'OK',
				headers: {},
				config: {
					headers: undefined,
				},
			};

			jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));

			const result = await service.getProviderA();
			expect(result).toEqual(mockResponse.data);
			expect(httpService.get).toHaveBeenCalledWith(
				`${mockApi.url}/provider1/jobs`,
			);
		});
	});

	describe('getProviderB', () => {
		it('should return data successfully', async () => {
			const mockResponse: AxiosResponse = {
				data: {
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
							'job-113': {
								position: 'Frontend Developer',
								location: {
									city: 'Austin',
									state: 'TX',
									remote: false,
								},
								compensation: {
									min: 73000,
									max: 113000,
									currency: 'USD',
								},
								employer: {
									companyName: 'TechCorp',
									website: 'https://dataworks.com',
								},
								requirements: {
									experience: 2,
									technologies: [
										'Java',
										'Spring Boot',
										'AWS',
									],
								},
								datePosted: '2025-02-24',
							},
						},
					},
				},
				status: 200,
				statusText: 'OK',
				headers: {},
				config: {
					headers: undefined,
				},
			};

			jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));

			const result = await service.getProviderB();
			expect(result).toEqual(mockResponse.data);
			expect(httpService.get).toHaveBeenCalledWith(
				`${mockApi.url}/provider2/jobs`,
			);
		});
	});
});
