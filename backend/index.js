import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './database/db.js';
import projectRoutes from "./routes/projectRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import signupRoutes from './routes/signup.routes.js';
import loginRoutes from './routes/login.routes.js';
import taskRoutes from './routes/taskRoutes.js';
dotenv.config();
const app = express();

app.use(cors());
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));


// parse bodies once
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mount routes
app.use('/api/signup', signupRoutes);
app.use('/api/login', loginRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/task", taskRoutes);

await connectDB();

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('Hello from Express server!');
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});