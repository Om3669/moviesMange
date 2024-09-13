const { PORT = 5001 } = process.env;

const app = require("./app");
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'frontEnd')));

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontEnd', 'index.html'));
});


const knex = require("./db/connection");

const listener = () => console.log(`Listening on Port ${PORT}!`);

knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch(console.error);
