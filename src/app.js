if (process.env.USER) require("dotenv").config();

const express = require("express");
const app = express();
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");
const path = require("path");

const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");
const cors = require('cors');

// TODO: Add your code here
///movies
// Serve static files from the 'src/frontEnd' directory
app.use(express.static(path.join(__dirname, 'frontEnd')));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontEnd', 'index.html'));
  });

app.use(express.json());
app.use(cors());




app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
