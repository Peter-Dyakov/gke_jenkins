import mongoose, { Connection } from 'mongoose';

declare global {
	var serviceDB: Connection;
}

async function initServiceDB() {
	try {
		if (!process.env.DB_URL) {
			throw new Error('DB_URL must be defined');
		}

		console.log('--------Pre Connecting to Service MongoDB...');
		console.log({ url: process.env.DB_URL });
		const dbUrl = `${process.env.DB_URL}/devOps`;
		const options = {
			authSource: 'admin'
		};

		global.serviceDB = mongoose.createConnection(dbUrl, options);


		console.log('--------Successfully Connected to Service MongoDB');
	} catch (error: any) {
		const msg = `Error | connecting to Service MongoDB:: ${error?.message}`;
		console.error(error);
		throw new Error(msg);
	}
}

export { initServiceDB };
