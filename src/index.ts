import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './utils/db';
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";

const app = express();

// Middleware
app.use(express.json());

// CORS - Uncomment this if you're having issues
// app.use(cors());

// CORS Configuration for Localhost
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use("/api/users", userRoutes);
app.use("/api", adminRoutes);

// Connect to database
connectDB().then(() => {
  console.log("Connected to the database successfully");
}).catch((error) => {
  console.error("Database connection failed:", error);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});

export default app;
