const connectToMongoose = require('./database');
connectToMongoose();

const express = require('express');
const app = express();

require('dotenv').config();
const port = process.env.PORT || 8001;

const userRoute = require('./routes/userRoute');
const quizCtgrRoute = require('./routes/categoriesRoute');
const ftrDataRoute = require('./routes/footerRoute');
const contactRoute = require('./routes/contactRoute');
const leaderBoardRoute = require('./routes/leaderBoardRoute');

app.use(express.json());

app.use('/api/user/', userRoute);
app.use('/api/quiz-category/', quizCtgrRoute);
app.use('/api/footer/', ftrDataRoute);
app.use('/api/contact/', contactRoute);
app.use('/api/ldr-brd/', leaderBoardRoute);

app.listen(port, () => {
    console.log(`Server is running on port : http://localhost:${port}`);
})