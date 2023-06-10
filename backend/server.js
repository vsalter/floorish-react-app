import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import connectDB from './config/database.js';
import productRoutes from './routes/productRoutes.js'
const port = process.env.PORT || 3001;

connectDB();

const app = express();

app.get('/', (req, res) => { 
    res.send('API is running...');
});

app.use('/api/products', productRoutes)

app.listen(port, () => console.log(`Server running on port ${port}`));