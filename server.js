


import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import productRoutes from './routes/productRoutes.js';
import connectDB from './db/connection.js';



dotenv.config();

const app = express();
const PORT = 3000
const uri = process.env.MONGODB_URL;

connectDB();



app.use(express.json());
app.use('/api/products', productRoutes);


mongoose.connect(uri)
.then(()=> console.log('Connected to MongoDB'))
.catch((e)=> console.log(`Error connecting to MongoDB: ${e}`));


app.get("/", async (req, res) => {
  res.status(200).json({ message: "Successfully connected to the database!" });
});


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));