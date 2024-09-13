const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  // TODO: Add your code here.
  const { movieId } = request.params;
  const movieById = await service.read(movieId);
  if(movieById){
     response.locals.movie = movieById;
     return next();
  }
  return next({status:404, message: "Movie cannot be found."});
}

async function read(request, response) {
  const { movie } = response.locals;
  response.json({ data : movie });
}

async function list(request, response) {
  try {
    const { is_showing } = request.query;
    let data ;
    if (is_showing) {
      data = await service.list(is_showing);
    } else {
      data = await service.list();
    }
    response.json({ data });
  } catch (error) {
    next(error); // In case of errors, pass them to the error-handling middleware
  }
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  movieExists
};
