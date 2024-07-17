require('dotenv').config();
const connectToMongoose = require('./database');
connectToMongoose();

const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 8001;
console.log("port " + process.env.PORT);
const bodyParser = require('body-parser');

app.use(cors());

const userRoute = require('./routes/userRoute');
const quizCtgrRoute = require('./routes/categoriesRoute');
const ftrDataRoute = require('./routes/footerRoute');
const contactRoute = require('./routes/contactRoute');
const leaderBoardRoute = require('./routes/leaderBoardRoute');
const homeInfoRoute = require('./routes/homeRoute');
const questionRoute = require('./routes/questionRoute');
const profileRoute = require('./routes/profileRoute');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/user/', userRoute);
app.use('/api/quiz-category/', quizCtgrRoute);
app.use('/api/footer/', ftrDataRoute);
app.use('/api/contact/', contactRoute);
app.use('/api/ldr-brd/', leaderBoardRoute);
app.use('/api/home/', homeInfoRoute);
app.use('/api/questions/', questionRoute);
app.use('/api/user-profile/', profileRoute);

app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
});
