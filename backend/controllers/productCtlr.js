import asyncHandler from "../middleware/asyncHandler.js";
import product from "../models/product.js";

const getProducts = asyncHandler(async (req, res) => {
    const products = await product.find({});
    res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
    const Product = await product.findById(req.params.id);

    if (Product) {
        return res.json(Product);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

const createProduct = asyncHandler(async (req, res) => {
    const Product = new product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: 'image/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        description: 'Sample description',
    });

    const createdProduct = await Product.save();
    res.status(201).json(createdProduct);
});

export { getProducts, getProductById, createProduct };