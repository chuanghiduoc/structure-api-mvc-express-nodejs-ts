import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/checkstatus', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'API ok'
  });
});

export default router;
