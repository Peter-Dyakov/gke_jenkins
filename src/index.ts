import * as dotenv from 'dotenv';
dotenv.config({ path: process.env.ENV_KEYS });

import { initServiceDB } from './boost/db-connections';

const PROJECT_NAME = 'devops-test-Project';

const connectToMongo = async () => {
	try {
		await initServiceDB();
	} catch (error: any) {
		const msg = `${PROJECT_NAME} | Failed to start the mongo connection, msg=${error?.message}`;
		console.error(msg);
		throw new Error(msg);
	}
};

const startServer = () => {
	const { app } = require('./app');
	console.log(`${PROJECT_NAME} | After importing app's file`);

	const port: number = 3000;

	app.listen(port, () => {
		console.log(`${PROJECT_NAME} |------------Listening for port ${port}`);
	});
};

(async () => {
	console.log(`${PROJECT_NAME}-Init | Step before Boot Env Data...`);

	try {
		await connectToMongo();
		startServer();
	} catch (error: any) {
		console.error(`${PROJECT_NAME} | Failed to boot... | ${error?.message}`);
	}
})();
