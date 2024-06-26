import { Response } from 'express';

const errorMiddleware = (err: any, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
};

export default errorMiddleware;
