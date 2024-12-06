import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

// Product routes
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT} in ${process.env.MODE} mode`);
});
