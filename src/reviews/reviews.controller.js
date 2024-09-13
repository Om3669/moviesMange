const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

async function reviewExists(request, response, next) {
  // TODO: Write your code here
  const { reviewId } = request.params;
  const review = await service.read(reviewId);
  if(review){
    response.locals.review = review;
    return next();
  }
  return next({"status":404, "message" : "Review cannot be found." });
}

async function validateReviewParams(request, response, next) {
  const { data } = request.body;
  if (data) {
    const paramCount = Object.keys(data).length;
    if (paramCount <= 7) { // Adjust count if necessary
      return next();
    } else {
      return response.status(400).json({ error: undefined });
    }
  } else {
    return response.status(400).json({ error: "No data provided" });
  }
}

async function destroy(request, response) {
  await service.destroy(response.locals.review.review_id)
  response.sendStatus(204);
}

async function list(request, response) {
  // TODO: Write your code here
  const { movieId } = response.locals;
  const reviews = await service.list(movieId);
  response.json({ data : reviews });
}

function hasMovieIdInPath(request, response, next) {
  const { movieId } = request.params;
  if (movieId) {
    response.locals.movieId = movieId;
    return next();
  }
  methodNotAllowed(request, response, next);
}

function noMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return methodNotAllowed(request, response, next);
  }
  next();
}

async function update(request, response) {

  // Merge existing review with the new data

  const updatedReview = {
    ...response.locals.review,
    ...request.body.data, // Assume request.body contains the fields to update
    review_id: response.locals.review.review_id, // Preserve review_id
  };
    const updatedRev = await service.update(updatedReview);
    response.json({ data: updatedRev });
}

module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(validateReviewParams),
    asyncErrorBoundary(update),
  ],
};
