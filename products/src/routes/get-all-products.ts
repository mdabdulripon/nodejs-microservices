import { NotFoundError } from '@alligators/common';
import express, { Request, Response } from 'express';
import { Product } from '../models/product';

const router = express.Router();

router.get('/api/products', async (req: Request, res: Response) => {
   const products = await Product.find({});

    if (!products) {
        throw new NotFoundError();
    }

    res.send(products);
});

export { router as getAllProductsRouter }
