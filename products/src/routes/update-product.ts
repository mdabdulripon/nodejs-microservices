import { NotAuthorizedError, NotFoundError, requireAuth, validateRequest } from '@alligators/common';
import express, { Request, Response } from 'express';
import { Product } from '../models/product';
import { body } from 'express-validator';

const router = express.Router();


router.put('/api/products/:id', requireAuth, 
    [
        body('title').not().isEmpty().withMessage(`Title is required`),
        body('price').isFloat({ gt: 0 }).withMessage(`Price must be gater then 0`),
    ], 
    validateRequest,
    async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new NotFoundError();
    }
    
    if (product.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }

    product.set({
        title: req.body.title,
        price: req.body.price
    });

    await product.save();
    
    res.send(product);
});

export { router as updateProduct }
