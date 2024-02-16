import { Router } from 'express';
import giftController from './gift/gift.controller';

const api = Router()
  .use('/gift', giftController);


export default Router().use('/api', api);
