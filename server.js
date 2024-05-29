require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const customerRoute = require('./routes/customerRoute');
const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors');

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(errorMiddleware);

app.use('/customers', customerRoute);

mongoose.set("strictQuery", false);
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to mongoDB success');
        app.listen(PORT, () => {
            console.log(`Node API app is running on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })