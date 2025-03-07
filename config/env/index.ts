import { IConfig } from './interfaces/config.interface';
import * as process from 'process';

export function config(): IConfig {
	return {
		app_id: process.env.APP_ID,
		app_name: process.env.APP_NAME,
		development: process.env.NODE_ENV === 'development',
		staging: process.env.NODE_ENV === 'staging',
		production: process.env.NODE_ENV === 'production',
		domain: process.env.DOMAIN,
		api: {
			url: process.env.API_URL,
		},
		ip:
			process.env.NODE_ENV === 'production'
				? process.env.PRODUCTION_IP
				: process.env.DEVELOPMENT_IP,
		port: process.env.PORT,
		cors: {
			origin: process.env.CORS_ORIGIN === 'true',
			methods: process.env.CORS_METHODS,
			credentials: process.env.CORS_CREDENTIALS === 'true',
		},
		swagger: {
			title: process.env.SWAGGER_TITLE,
			description: process.env.SWAGGER_DESCRIPTION,
			version: process.env.SWAGGER_VERSION,
			route: process.env.SWAGGER_ROUTE,
		},
		database: {
			type: 'mysql',
			host: process.env.DB_HOST,
			port: +process.env.DB_PORT,
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			entities: [],
			subscribers: [],
			synchronize: process.env.DB_SYNCHRONIZE === 'true',
			logging: process.env.DB_LOGGING === 'true',
			auto_load_entities: process.env.DB_AUTO_LOAD_ENTITIES === 'true',
			timezone: process.env.DB_TIMEZONE,
			date_string: process.env.DB_DATE_STRING === 'true',
		},
	};
}
