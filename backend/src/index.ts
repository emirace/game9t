import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/database';
import router from './routes';
import { frontendUrl, port } from './config/env';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { setupSockets } from './socket';

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

// Create the HTTP server
const server = createServer(app);

// Initialize Socket.IO
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // Configure allowed origins here
    methods: ['GET', 'POST'],
  },
});

// Store the io instance in the Express app
app.set('io', io);

// Setup socket event listeners
setupSockets(io);

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
