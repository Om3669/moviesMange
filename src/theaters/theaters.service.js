const db = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  is_showing: ["movies", null, "is_showing"],
  created_at: ["movies", null, "created_At"],
  updated_at: ["movies", null, "updated_At"],
  theater_id: ["movies", null, "theater_Id"]
});

async function list(movieId = undefined) {
  if(movieId){
    return db("theaters")
    .join(
      "movies_theaters",
      "movies_theaters.theater_id",
      "theaters.theater_id"
    )
    .join("movies", "movies.movie_id", "movies_theaters.movie_id")
    .where({ "movies.movie_id" : movieId })
    .select("*","theaters.created_at as created_At ","theaters.updated_at as updated_At","movies_theaters.theater_id as theater_Id")
    .then(reduceMovies);

  }else {
    return db("theaters")
    .join(
      "movies_theaters",
      "movies_theaters.theater_id",
      "theaters.theater_id"
    )
    .join("movies", "movies.movie_id", "movies_theaters.movie_id")
    .select("*","theaters.created_at as created_At ","theaters.updated_at as updated_At","movies_theaters.theater_id as theater_Id")
    .then(reduceMovies);
  }
}

module.exports = {
  list,
};
