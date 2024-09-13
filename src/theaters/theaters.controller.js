const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");



async function list(request, response) {
  const { movieId } = request.params;
  if(movieId){
    const data = await service.list(movieId);
    response.json({ data });
  }else {
    const data = await service.list();
    response.json({ data });
  }
}

module.exports = {
  list: asyncErrorBoundary(list),

};
