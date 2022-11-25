import { Request, Response, NextFunction } from 'express';
import { VerifyRequest } from './';

export interface VerifyController {
  (req: VerifyRequest, res: Response, next: NextFunction): Promise<void | Response>;
}
export interface Controller {
  (req: Request, res: Response, next: NextFunction): Promise<void | Response>;
}
