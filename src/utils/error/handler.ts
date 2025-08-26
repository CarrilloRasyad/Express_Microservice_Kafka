import { Request, Response, NextFunction } from 'express';
import {
   AuthorizeError,
   NotFoundError,
   ValidationError,
} from './errors';
import { logger } from '../logger';

export const HandleErrorWithLogger = (
   error: Error,
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   let reportError = true;
   let status = 500;
   let data = error.message;


   [NotFoundError, ValidationError, AuthorizeError].forEach(
      (typeOfError) => {
         if (error instanceof typeOfError) {
            reportError = false;
            status = error.status;
            data = error.message;
         }
      },
   );

   if (reportError) {
      logger.error(error);
   } else {
      logger.warn(error);
   }

   return res.status(status).json(data);
};

export const HandleUnCaughtException = async (
   error: Error,
) => {

   logger.error(error);

   process.exit(1);
};