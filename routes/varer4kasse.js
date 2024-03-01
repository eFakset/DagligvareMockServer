const responseHandler = require("../utils/responseHandler");
const url = require("url");

function getVarer4kasse(req, res) {
  // Parse the URL
  const parsedUrl = url.parse(req.url, true);

  // Check if there are query parameters
  if (Object.keys(parsedUrl.query).length > 0) {
    console.log("Query parameters:", parsedUrl.query);
    let articleId = parsedUrl?.query?.articleid;
    let article = "";
    switch (articleId) {
      case "1":
        article =
          '[{"id":"1","name":"Hubba Bubba","amountType":1,"amountTypeName":"Stk","unitPrice":"11.50"}]';
        break;
      case "2":
        article =
          '[{"id":"2","name":"Dundersalt","amountType":1,"amountTypeName":"Stk","unitPrice":"23.90"}]';
        break;
      case "3":
        article =
          '[{"id":"3","name":"Fox","amountType":1,"amountTypeName":"Stk","unitPrice":"2.50"}]';
        break;
      case "4":
        article =
          '[{"id":"4","name":"Rex","amountType":1,"amountTypeName":"Stk","unitPrice":"2.50"}]';
        break;
      default:
        console.log("422 Unprocessable Content");
        console.log(parsedUrl);
        return res.status(422).json({
          errorMessage: "422 Unprocessable Content",
          message: "422 Unprocessable Content",
        });
    }
    responseHandler("/varer4kasse", article, res);
  } else {
    console.log("No parameters");
    const articles = `[{"id":"1","name":"Hubba Bubba"}
    ,{"id":"2","name":"Dundersalt"}
    ,{"id":"3","name":"Fox"}
    ,{"id":"4","name":"Rex"}]`;
    responseHandler("/varer4kasse", articles, res);
  }
}

module.exports = getVarer4kasse;
