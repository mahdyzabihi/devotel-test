import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDatabase } from './env/interfaces/database.interface';

@Injectable()
export class OrmConfig implements TypeOrmOptionsFactory {
	private readonly DatabaseConfig: IDatabase;

	constructor(private _configService: ConfigService) {
		this.DatabaseConfig = this._configService.get<IDatabase>('database');
	}

	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: 'mysql',
			host: this.DatabaseConfig.host,
			port: +this.DatabaseConfig.port,
			username: this.DatabaseConfig.username,
			password: this.DatabaseConfig.password,
			database: this.DatabaseConfig.database,
			entities: this.DatabaseConfig.entities,
			subscribers: this.DatabaseConfig.subscribers,
			synchronize: this.DatabaseConfig.synchronize,
			logging: this.DatabaseConfig.logging,
			autoLoadEntities: this.DatabaseConfig.auto_load_entities,
			timezone: this.DatabaseConfig.timezone,
			dateStrings: this.DatabaseConfig.date_string,
		};
	}
}
