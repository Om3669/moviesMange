const knex = require("../db/connection");
const db = require("../db/connection");

async function list(is_showing = undefined) {
  if (is_showing) {
    const isShowingBoolean = Boolean(is_showing);
    return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id","m.movie_id")
    .select("*")
    .distinct("m.movie_id") 
    .where({ "mt.is_showing":  isShowingBoolean })
    .groupBy("m.movie_id");
  } else {
    return knex("movies")
    .select("*");
  }
}

async function read(movie_id) {
  // TODO: Add your code here
  return knex("movies").select("*")
  .where({"movie_id": movie_id})
  .first();  
  
}

module.exports = {  
  list,
  read,
};
