import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './utils/db';
import userRoutes from "./routes/userRoutes"
import adminRoutes from "./routes/adminRoutes"

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

//route
app.use("/api/users", userRoutes)
app.use("/api/", adminRoutes)

// Connect to database
console.log("testings")
connectDB();



const PORT = process.env.PORT || 5000;

try {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
} catch (error) {
    console.error(`Failed to start server: `);
}

export default app;
