import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import cors from 'cors';

import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

import trim from './middleware/trim';

import authRoutes from './routes/auth';
// import postRoutes from './routes/posts';
// import subRoutes from './routes/subs';
// import miscRoutes from './routes/misc';
import projectRoutes from './routes/projects';
import userRoutes from './routes/user';
import bugRoutes from './routes/bugs';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan('dev'));
app.use(trim);
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
  })
);

app.use(express.static('public'));

app.use('/', authRoutes);
app.use('/projects', projectRoutes);
app.use('/users', userRoutes);
app.use('/projects', bugRoutes);

app.listen(PORT, async () => {
  console.log(`server running at http://localhost:${5000}`);

  try {
    await createConnection();
    console.log('Database connected');
  } catch (err) {
    console.log(err);
  }
});
// createConnection()
//   .then(async (connection) => {
//     app.listen(5000, () => console.log('Server up at http://localhost:5000'));
//   })
//   .catch((error) => console.log(error));
