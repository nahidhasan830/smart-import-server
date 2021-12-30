import catchAsync from '../utils/catchAsync';
import appError from '../utils/appError';
import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';

export const deleteOne = (Model: Model<any>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndDelete(id);

    if (!doc)
      return next(new appError(`No document found with the id: ${id}`, 404));

    res.status(204).json({
      status: 'success',
      data: null
    });
  });

export const updateOne = (Model: Model<any>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const doc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc)
      return next(new appError(`Document not found for the id: ${id}`, 404));

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

export const createOne = (Model: Model<any>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

export const getOne = (Model: Model<any>, popOptions?: Object) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    let query = Model.findById(id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc)
      return next(new appError(`No document found with the id: ${id}`, 404));

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

export const getAll = (Model: Model<any>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.find();

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  });
