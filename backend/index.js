import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import router from './routes/route.js';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';

import instrumentRoutes from './routes/r.js';

// Use the instrument routes
router.use('/r', instrumentRoutes)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); 

// Routes
app.use('/api', router);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Update the static file serving path to point to the correct directory
const projectRoot = path.join(__dirname, '..');
const uploadsPath = path.join(projectRoot, 'uploads');
console.log('Serving uploads from:', uploadsPath);
app.use('/uploads', express.static(uploadsPath));


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
