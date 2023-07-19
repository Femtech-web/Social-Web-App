require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true}));
app.use(bodyParser.json({ limit: '30mb', extended: true}));

// Routes
app.use('/api/users', authRouter);
app.use('/api/posts', postRouter);


// Database and server connection
const port = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, 
{ useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Database Connected Successfully');
    app.listen(port, () => {
        console.log(`server is running on port ${port}`);
    })
})
.catch((err) => {
    console.log(err);
})


