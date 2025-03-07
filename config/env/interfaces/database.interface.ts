export interface IDatabase {
	type: string;
	host: string;
	port: number;
	username: string;
	password: string;
	database: string;
	entities: any[];
	subscribers: any[];
	synchronize: boolean;
	logging: boolean;
	auto_load_entities: boolean;
	timezone: string;
	date_string: boolean;
}
