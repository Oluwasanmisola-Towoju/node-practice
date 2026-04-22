import express from 'express';
import { config } from "dotenv";
import { connectDB, disconnectDB } from './config/db.js';
 
//Import Routes
import movieRoutes from './routes/movieRoutes.js';
import authRoutes from './routes/authRoutes.js';
config();
connectDB(); 

const app = express();

// Body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//API Routes
app.use('/movies', movieRoutes);
app.use('/auth', authRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);  
});

// Handle unhandled promise rejections (e.g, distance connection errors)
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    // Close the database connection
    server.close(async () => {
        await disconnectDB();
        // Exit the process
        process.exit(1);
    });
});

//Handle uncaught exceptions (e.g, syntax errors)
process.on('uncaughtException', async (err) => {
    console.error('Uncaught Exception:', err);
    // Close the database connection
    await disconnectDB();
    // Exit the process
    process.exit(1);
});

// Graceful shutdown on SIGTERM or SIGINT (e.g, when the process is killed or interrupted)  
process.on('SIGTERM', async () => {
    console.log('Received SIGTERM. Shutting down gracefully...');
    server.close(async () => {
        await disconnectDB();
        process.exit(0);
    });
});

process.on('SIGINT', async () => {
    console.log('Received SIGINT. Shutting down gracefully...');
    server.close(async () => {
        await disconnectDB();
        process.exit(0);
    });
});