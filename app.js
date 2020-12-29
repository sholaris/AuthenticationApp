const dotenv = require('dotenv')
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const users = require('./routes/users')
const cors = require('cors');
const connectDB = require('./config/db')

// Setting config file
dotenv.config({ path: './config/config.env' });

// Conenct to DB
connectDB();

// Initiate express app
const app = express();

// Specified PORT
const PORT = process.env.PORT || 5000;


/* INLUDING MIDDLEWARES */

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Body Parser Middleware
app.use(bodyParser.json());

// CORS Middleware
app.use(cors());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Users Route
app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
    res.send('INVALID ENDPOINT');
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

// Start app
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`))