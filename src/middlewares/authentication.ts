/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import jwt from 'jsonwebtoken';
import { isEmpty } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { STATUS_CODE } from '../utils';
import { secret } from '../config';

export const authentication = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (isEmpty(token)) return res.status(401).json({ code: STATUS_CODE.E14 });

  jwt.verify(token as string, secret.key, (err, decoded) => {
    if (err) return res.status(401).json({ code: STATUS_CODE.E14 });

    req.user = decoded?.id;

    return next();
  });
};
