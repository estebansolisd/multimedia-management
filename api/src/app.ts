import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import categoryRoutes from './routes/categoryRoutes';
import themeRoutes from './routes/themeRoutes';
import contentRoutes from './routes/contentRoutes';
import errorMiddleware from './middlewares/errorMiddleware';

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/themes', themeRoutes);
app.use('/api/contents', contentRoutes);

app.use(errorMiddleware);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
