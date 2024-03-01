const responseHandler = require("../utils/responseHandler");

function getVaregrupper(req, res) {
  const stockCategories = '[{"id":"1","name":"Godteri"}]';
  responseHandler("/varegrupper", stockCategories, res);
}

module.exports = getVaregrupper;
