import { NextFunction, Request, Response, Router } from 'express';
import { getStaff } from './staff.service';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getStaff(req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;