import { Router } from 'express';
import {
  getAllSite,
  createSite,
  getSite,
  updateSite,
  deleteSite
} from '../controller/siteContorller';

const router = Router();

router.route('/').get(getAllSite).post(createSite);

router.route('/:id').get(getSite).patch(updateSite).delete(deleteSite);

export default router;
