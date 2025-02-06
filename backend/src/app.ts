import express from 'express';
import peopleRouter from './routes/people';
import cors from 'cors';
import mongoose from "mongoose";

const mongoUri = 'mongodb://localhost:27017/People'

mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log(`🚀 MongoDB database ${mongoUri} Connected...`))
    .catch((err) => console.log(err))

const app = express();
const port = 3000;

// Middleware
app.use(cors()) // to allow cross-origin requests
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World from TypeScript with Express.js!');
});

app.use('/api/people', peopleRouter)

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
