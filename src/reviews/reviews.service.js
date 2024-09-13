const db = require("../db/connection");
const knex = require("../db/connection");

const tableName = "reviews";

async function destroy(reviewId) {
  await knex("reviews").where( {"review_id" : reviewId}).del();
  // TODO: Write your code here
  
}

async function list(movie_id) {
  // return knex("reviews")
  // .select("*")
  // .where({"movie_id": movie_id})
  // .then(setCritic);
  return db(tableName)
  .where({ movie_id: movie_id })
  .then(reviews => {
     const reviewPromises =  reviews.map(review => read(review.review_id)
     .then(setCritic))
    return Promise.all(reviewPromises);
});

}

async function read(reviewId) {
  // TODO: Write your code here
  return knex("reviews")
  .select("*")
  .where({"review_id": reviewId})
  .first();
}

async function readCritic(critic_id) {
  return db("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  try {
    review.critic = await readCritic(review.critic_id);
    return review;
  } catch (error) {
    throw new Error("Error fetching critic details"); // Error handling
  }
}


async function update(review) {
    try{
      return db(tableName)
      .where({ review_id: review.review_id })
      .update(review, "*")
      .then(() => read(review.review_id))
      .then(setCritic);
    } catch (error) {
    throw new Error("Error fetching critic details"); // Error handling
  }
}

module.exports = {
  destroy,
  list,
  read,
  update,
};
