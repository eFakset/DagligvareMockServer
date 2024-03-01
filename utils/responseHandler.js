function responseHandler(urlPath, reqResponse, res) {
  const { status400, status401, status503, dberror } = process.env;
  if (status400 == "true") {
    console.log(`${urlPath}: 400 Bad Request`);
    console.log(reqResponse);
    return res.status(400).json({ errorMessage: "400 Bad Request" });
  } else if (status401 == "true") {
    console.log(`${urlPath}: 401 Unauthorized`);
    return res.status(401).json({ errorMessage: "401 Unauthorized" });
  } else if (status503 == "true") {
    console.log(`${urlPath}: 503 Service Unavailable`);
    return res.status(503).json({ errorMessage: "Feil" });
  } else if (dberror == "true") {
    console.log(`${urlPath}: dberror / 500 Internal Server Error`);
    return res
      .status(500)
      .json({ errorMessage: "dberror / 500 Internal Server Error" });
  } else {
    console.log(urlPath + " ReqResponse: ", reqResponse);
    return res.status(200).json({ message: "200 OK", reqResponse });
  }
}
module.exports = responseHandler;
