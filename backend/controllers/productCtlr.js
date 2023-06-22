import asyncHandler from "../middleware/asyncHandler.js";
import product from "../models/product.js";

const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};

    const count = await product.countDocuments({...keyword});


    const products = await product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1));
    res.json({products, page, pages: Math.ceil(count/pageSize)});
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

const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    const Product = await product.findById(req.params.id);

    if (Product) {
        Product.name = name;
        Product.price = price;
        Product.description = description;
        Product.image = image;
        Product.brand = brand;
        Product.category = category;
        Product.countInStock = countInStock;

        const updatedProduct = await Product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});


const deleteProduct = asyncHandler(async (req, res) => {
    const Product = await product.findById(req.params.id);

    if (Product) {
        await product.deleteOne({ _id: Product._id });
        res.status(200).json({ message: 'Product deleted' });
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };