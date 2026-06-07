import express, { type Express, type Request, type Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app: Express = express();
const PORT  = process.env.PORT || 5000;

app.use(express.json());

// Basic Route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express with TypeScript!' });
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
