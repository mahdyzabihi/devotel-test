import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { IApi } from '../../../config/env/interfaces/api.interface';

@Injectable()
export class ApiService {
	private readonly Api: IApi;

	constructor(
		private readonly httpService: HttpService,
		private readonly _configService: ConfigService,
	) {
		this.Api = this._configService.get<IApi>('api');
	}

	async getProviderA(): Promise<any | null> {
		try {
			const response: AxiosResponse = await lastValueFrom(
				this.httpService.get(`${this.Api.url}/provider1/jobs`),
			);
			return response.data;
		} catch (error) {
			throw new Error(`Failed to fetch external data: ${error.message}`);
		}
	}
	async getProviderB(): Promise<any | null> {
		try {
			const response: AxiosResponse = await lastValueFrom(
				this.httpService.get(`${this.Api.url}/provider2/jobs`),
			);
			return response.data;
		} catch (error) {
			throw new Error(`Failed to fetch external data: ${error.message}`);
		}
	}
}
