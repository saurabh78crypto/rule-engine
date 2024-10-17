import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import ruleRoutes from './routes/ruleRoutes.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

let corsOptions = {
    origin: 'http://localhost:3000',
    methods: [ 'GET', 'POST', 'PUT' ]
}
app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();

// Use routes
app.use('/api/rules', ruleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
