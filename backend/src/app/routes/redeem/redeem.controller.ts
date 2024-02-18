import { Router, Request, Response, NextFunction } from 'express';
import { createRedemption } from './redemption.service';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await createRedemption(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
