import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/database';
import router from './routes';
import { frontendUrl, port } from './config/env';

connectDB();

const app: Express = express();

app.use(express.json());
app.use(
  cors({
    origin: frontendUrl,
  }),
);

app.use(morgan('dev'));
app.use(helmet({ crossOriginResourcePolicy: false }));

app.use('/api', router);
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Game9t');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
