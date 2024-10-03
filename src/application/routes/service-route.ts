import express, { Request, Response } from 'express';
import { saveRequestToDatabase } from '../services/database-service';

const router = express.Router();

router.post('/v1/message', async (req: Request, res: Response) => {
    try {
        if (!Object.keys(req.body).length) {
            res.status(400).json({
                success: false,
                error: 'Bad Request',
                message: 'request body is required'
            });
        }
        else {
            await saveRequestToDatabase(req.body);
            res.status(200).json({ success: true, message: 'Request processed successfully' });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: 'Bad Request',
            message: 'cannot process your request'
        });
    }
});

export { router as serviceCheckRouter };