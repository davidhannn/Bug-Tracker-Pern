import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { Request, Response } from 'express';

dotenv.config();

import trim from './middleware/trim';

import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import userRoutes from './routes/user';
import bugRoutes from './routes/bugs';

const app = express();
const PORT = process.env.PORT;

// app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.set('trust proxy', 1);
app.use(trim);
// app.use(cookieParser());
// app.use(
//   cors({
//     credentials: true,
//     // origin: process.env.ORIGIN,
//     origin: process.env.FRONTEND_URL,
//   })
// );

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client/build')));
// }

// var whitelist = [
//   'https://bug-tracker-pern.netlify.app',
//   'http://bug-tracker-pern.netlify.app',
// ];
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   if (whitelist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false }; // disable CORS for this request
//   }
//   callback(null, corsOptions); // callback expects two parameters: error and options
// };

// var corsOptions = {
//   origin: 'https://bug-tracker-pern.netlify.app/',
//   // origin: ['http://localhost:3000', 'https://bug-tracker-pern.netlify.app'],
//   credentials: true,
//   optionsSuccessStatus: 200,
// // };
app.use(
  cors({
    origin: 'https://bug-tracker-pern.netlify.app',
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders:
      'Authorization, Access-Control-Allow-Headers, Origin,X-Requested-With,Content-Type,Accept,content-type,application/json',
    credentials: true,
  })
);
// app.options('*', cors())
app.use(express.static('public'));

app.use('/', authRoutes);
app.use('/projects', projectRoutes);
app.use('/users', userRoutes);
app.use('/projects', bugRoutes);

// app.listen(PORT, async () => {
//   console.log(`server running at http://localhost:${5000}`);

//   try {
//     await createConnection();
//     console.log('Database connected');
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.get('*', (_, res: Response) => {
//   res.sendFile(path.join(__dirname, 'client/build/index.html'));
// });

export default app;
