import express, { Request, Response, RequestHandler, NextFunction, json } from 'express';
import 'express-async-errors';
import { healthCheckRouter, serviceCheckRouter } from './application/routes';
import compression from 'compression';

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	next();
});

app.set('trust proxy', true);
app.use(json() as RequestHandler);

app.use(compression());


app.use(healthCheckRouter);
app.use(serviceCheckRouter);

app.all('*', async (req: Request, res: Response) => {
	res.status(404).json({ success: false, error: 'Not Found', message: 'Requested Router cannot be found' })
});

export { app };
