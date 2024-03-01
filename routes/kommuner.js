const responseHandler = require("../utils/responseHandler");

function getKommuner(req, res) {
  const reqResponse = "/kommuner";
  console.log("ENDPOINT: /kommuner" + " ReqResponse: ", reqResponse);
  responseHandler("/kommuner", reqResponse, res);
}

module.exports = getKommuner;
