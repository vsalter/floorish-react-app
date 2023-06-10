import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import product from '../models/product.js';
const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {
    const products = await product.find({});
    res.json(products);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const Product = await product.findById(req.params.id);

    if (Product) {
        return res.json(Product);
    }

    res.status(404).json({ message: 'Product not found'});

}));


export default router;