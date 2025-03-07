import { ICors } from './cors.interface';
import { IDatabase } from './database.interface';
import { ISwaggerConfig } from './swagger-config.interface';
import { IApi } from './api.interface';

export interface IConfig {
	app_id: string;
	app_name: string;
	development: boolean;
	staging: boolean;
	production: boolean;
	domain: string;
	api: IApi;
	ip: string;
	port: string;
	cors: ICors | undefined;
	swagger: ISwaggerConfig | undefined;
	database: IDatabase;
}
