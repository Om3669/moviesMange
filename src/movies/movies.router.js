const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

// TODO: Add your routes here
// GET /movies
// GET /movies?is_showing=true
router
  .route("/")
  .get(controller.list);

router
.route("/:movieId")
.get(controller.read);

router.use("/:movieId/theaters",  controller.movieExists, theatersRouter);
router.use("/:movieId/reviews", controller.movieExists, reviewsRouter);

module.exports = router;
