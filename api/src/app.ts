import express from 'express';
import cors from "cors";
import { userRouter } from './routes/userRoutes';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

// Use CORS middleware with options
app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/users', userRouter);


export default app;