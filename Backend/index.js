const connectToMongoose = require('./database');
connectToMongoose();

const express = require('express');
const app = express();

require('dotenv').config();
const port = process.env.PORT || 8001;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port : http://localhost:${port}`);
})