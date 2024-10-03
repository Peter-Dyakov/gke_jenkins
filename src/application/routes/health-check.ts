import express, { Request, Response } from 'express';

const router = express.Router();

router.all('/v1/health', async (req: Request, res: Response) => {
	res.status(200).json({ success: true, message: 'healthy' })
});

export { router as healthCheckRouter };
