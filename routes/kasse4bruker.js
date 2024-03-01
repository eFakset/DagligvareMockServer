const responseHandler = require("../utils/responseHandler");

function getKasse4bruker(req, res) {
  const registers =
    '[{"id":"1","name":"Sjappa på hjørnet","registerNo":"1","chainId":"1","chainName":"Våre sjapper"}]';
  responseHandler("/kasse4bruker", registers, res);
}

module.exports = getKasse4bruker;
