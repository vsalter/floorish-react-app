import mongoose from "mongoose";
import dotenv from 'dotenv';
import users from "./data/users.js";
import products from "./data/products.js";
import user from "./models/user.js";
import product from "./models/product.js";
import order from "./models/order.js";
import connectDB from "./config/database.js";

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await order.deleteMany();
        await product.deleteMany();
        await user.deleteMany();

        const createdUsers = await user.insertMany(users);
        const adminUser = createdUsers[0]._id;
        
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        await product.insertMany(sampleProducts);

        console.log('Data Imported!');
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await order.deleteMany();
        await product.deleteMany();
        await user.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
 };


 if (process.argv[2] === '-d') {
    destroyData();
 } else {
    importData();
 }