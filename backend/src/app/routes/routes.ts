import { Router } from 'express';
import redeemController from './redeem/redeem.controller';
import staffController from './staff/staff.controller';

const api = Router()
  .use('/redeem', redeemController)
  .use('/staff', staffController);


export default Router().use('/api', api);
