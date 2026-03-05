import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import 'dotenv/config';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import skillsRoute from './routes/skillsRoute.js';
import projectRoute from './routes/projectRoute.js';


const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 7000;
const MONGODBURL = process.env.MONGODB_URL;

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(cors());





mongoose
    .connect(MONGODBURL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// user routes
app.use("/api", userRoute);
// skills routes
app.use("/skills", skillsRoute)
//Projects routes
app.use('/projects',projectRoute)

