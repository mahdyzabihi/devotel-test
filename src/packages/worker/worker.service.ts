import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApiService } from '../api/api.service';
import { DatabaseService } from '../database/database.service';
import { JobType } from '../data-transform/types/job.type';
import { DataTransformService } from '../data-transform/data-transform.service';
import { ProviderATransform } from '../data-transform/providers/provider-a.transform';
import { ProviderBTransform } from '../data-transform/providers/provider-b.transform';

@Injectable()
export class WorkerService {
	constructor(
		private readonly _apiService: ApiService,
		private readonly _databaseService: DatabaseService,

		private readonly dataTransformService: DataTransformService,
		private readonly providerATransform: ProviderATransform,
		private readonly providerBTransform: ProviderBTransform,
	) {}

	@Cron(process.env.CRON_JOBS || CronExpression.EVERY_MINUTE)
	async apiGet() {
		try {
			await this.providerA();
			await this.providerB();
		} catch {}
	}

	private async providerA() {
		const dataProviderA = await this._apiService.getProviderA();
		const transferDataProviderA = this.getProviderData(
			dataProviderA,
			this.providerATransform,
		);
		await this._databaseService.bulkInsertAsync(transferDataProviderA);
	}
	private async providerB() {
		const dataProviderB = await this._apiService.getProviderB();
		const transferDataProviderB = this.getProviderData(
			dataProviderB,
			this.providerBTransform,
		);
		await this._databaseService.bulkInsertAsync(transferDataProviderB);
	}
	private getProviderData(
		data: any,
		dataTransform: DataTransform,
	): JobType[] {
		this.dataTransformService.setTransform(dataTransform);
		return this.dataTransformService.transform(data);
	}
}
