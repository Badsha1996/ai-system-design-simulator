import express, { type Express, type Request, type Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { corsOptions } from "./utils/security.js";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;


// My Goodness, Look at all this 
// configuration for SECURITY
// Ohhhh I love coding by my own hands 
app.use(express.json());
app.use(cors(corsOptions));

// Basic Route
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ message: "Server is healthy" });
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at ${PORT}`);
});
