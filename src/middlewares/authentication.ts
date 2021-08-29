import jwt from 'jsonwebtoken';
import { isEmpty } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { STATUS_CODE } from '~/utils';
import { secret } from '~/config';

export const authentication = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization;

  if (isEmpty(token)) throw res.status(401).json({ code: STATUS_CODE.E14 });

  jwt.verify(token as string, secret.key, (err, decoded) => {
    if (err) throw res.status(401).json({ code: STATUS_CODE.E13 });

    req.userId = decoded?.id;

    return next();
  });
};
