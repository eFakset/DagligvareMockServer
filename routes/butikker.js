const responseHandler = require("../utils/responseHandler");

function getButikker(req, res) {
  const stores =
    '[{"id":"1","name":"Sjappa på hjørnet","municipalityName":"Sandefjord","countyName":"Vestfold"}]';
  responseHandler("/butikker", stores, res);
}

module.exports = getButikker;
