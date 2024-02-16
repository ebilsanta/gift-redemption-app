import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.post(
  '/redeem',
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(201).json({'msg': 'ok'});
  }
);

export default router;