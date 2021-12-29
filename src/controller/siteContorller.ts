import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
} from './handlerFactory';
import Site from '../model/siteModel';

export const getAllSite = getAll(Site);

export const getSite = getOne(Site);

export const createSite = createOne(Site);

export const updateSite = updateOne(Site);

export const deleteSite = deleteOne(Site);
