import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import cookieParser from  'cookie-parser'
import authRoute from './routes/authRoutes.js';
import googleAuthRoute from './routes/googleAuthRoute.js';
import './config/passport-jwt.js'
import './config/passport-google.js'; 
import * as driver from './neo4j/neo4j.js'; 
import connectDB from './config/connectdb.js'; 

dotenv.config();
const app = express();

app.use(express.json());

// Set up CORS
app.use(cors({
    origin:  process.env.FRONTEND_HOST, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
}));

// Express session middleware
app.use(session({
    secret: process.env.SECRET_KEY, // Change to a secure secret
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(cookieParser());

// Initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Initialize Neo4j driver
connectDB(process.env.NEO4J_URI, process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD);

// Use routes

app.use('/', googleAuthRoute);
app.use('/api/user', authRoute);

// Create a session for executing queries
const sessiondb = driver.getDriver().session();

//verify DB conncection
app.get('/test', async (req, res) => {
    try {
        const result = await sessiondb.run('MATCH (n) RETURN n');
        const nodes = result.records.map((record) => record.get(0).properties);
        res.json(nodes);
    } catch (error) {
        console.error('Error querying Neo4j:', error);
        res.status(500).send('Neo4j query failed');
    }
});

// General error handler
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).send({
        message: "Something went wrong",
        success: false
    });
});

// Start the server
const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});