require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const url = require("url");
const PORT = parseInt(process.env.PORT) || 3001;
var status400 = process.env.status400 === "true" ? true : false;
var status401 = process.env.status401 === "true" ? true : false;
var status503 = process.env.status503 === "true" ? true : false;
var dberror = process.env.dberror === "true" ? true : false;
const app = express();

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

function responseHandler(urlPath, reqResponse, res) {
  if (status400) {
    console.log(`${urlPath}: 400 Bad Request`);
    console.log(reqResponse);
    res.status(400).json({ errorMessage: "400 Bad Request" }).send();
  } else if (status401) {
    console.log(`${urlPath}: 401 Unauthorized`);
    res.status(401).json({ errorMessage: "401 Unauthorized" }).send();
  } else if (status503) {
    console.log(`${urlPath}: 503 Service Unavailable`);
    res.status(503).json({ errorMessage: "Feil" }).send();
  } else if (dberror) {
    console.log(`${urlPath}: dberror / 500 Internal Server Error`);
    res
      .status(500)
      .json({ errorMessage: "dberror / 500 Internal Server Error" })
      .send();
  } else {
    console.log("reqResponse: ");
    console.log(reqResponse);
    res.status(200).json({ message: "200 OK", reqResponse }).send();
  }
}

console.log("MockServer starts with:");
console.log("status400:     " + status400);
console.log("status401:     " + status401);
console.log("status503:     " + status503);
console.log("dberror  :     " + dberror);

app.get("/varegrupper", function (req, res) {
  const stockCategoriesJsonRes = '[{"id":"1","name":"Godteri"}]';
  responseHandler("/varegrupper", stockCategoriesJsonRes, res);
});

app.get("/kommuner", function (req, res) {
  const municipalities =
    '[{"id":"0","name":"Ukjent kommune"},{"id":"1","name":"Sandefjord"}]';
  responseHandler("/kommuner", municipalities, res);
});

app.get("/butikker", function (req, res) {
  const stores =
    '[{"id":"1","name":"Sjappa på hjørnet","municipalityName":"Sandefjord","countyName":"Vestfold"}]';
  responseHandler("/butikker", stores, res);
});

app.get("/kasser", function (req, res) {
  const kasser =
    '[{"id": 101,"butikk_nr": 1,"butikk_nv": "Store Name","kasse_nr": 1,"bruker_nr": 123,"bruker_nv": "User Name"}]';
  responseHandler("/kasser", kasser, res);
});

app.get("/kasse4bruker", function (req, res) {
  //butikk.butikk_nr as storeId, butikk_nv as storeName, kasse_nr as registerNo, kjede.kjede_nr as chainId, kjede_nv as chainName
  const registers =
    '[{"id":"1","name":"Sjappa på hjørnet","registerNo":"1","chainId":"1","chainName":"Våre sjapper"}]';
  responseHandler("/kasse4bruker", registers, res);
});

app.get("/varer4kasse", function (req, res) {
  const articles = `[{"id":"1","name":"Hubba Bubba"}
    ,{"id":"2","name":"Dundersalt"}
    ,{"id":"3","name":"Fox"}
    ,{"id":"4","name":"Rex"}]`;
  responseHandler("/varer4kasse", articles, res);
});

app.get("/varer4generering", function (req, res) {});

app.get("/vare4kasse", function (req, res) {
  var q = url.parse(req.url, true);
  var qdata = q.query;
  let articleId = qdata.articleid;

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
      article = "[]";
  }
  res.json({ message: JSON.parse(article) });
});

app.get("/brukertyper", function (req, res) {
  const usertypes = '[{"id":"K","name":"Kasseoperatør"}]';
  responseHandler("/brukertyper", usertypes, res);
});

app.put("/nybruker", function (req, res) {
  //   const bodylog = req.body;
  //   console.log("Bodylog: ", bodylog);
  //   console.log("Lagt til ny bruker: ");
  //   console.log(req.body.User);
  responseHandler("/nybruker", req.body, res);
});

app.put("/nyhandel", function (req, res) {
  res.status(200).json(req.body).send();
});

app.get("/kunder", function (req, res) {
  const customers =
    '[{"id":"1","name":"Laura Tørrbjørkhaugen","isDeletable":0,"municipalityName":"Sandefjord","countyName":"Vestfold"}]';
  responseHandler("/kunder", customers, res);
});

app.delete("/slettkunde", function (req, res) {
  res.status(200).json(req.body).send();
});

app.put("/nykunde", function (req, res) {
  res.status(200).json(req.body).send();
});

app.put("/oppdaterkunde", function (req, res) {
  res.status(200).json(req.body).send();
});

app.get("/perioder", function (req, res) {
  const periods = '[{"id":"202402","firstsale":"2024-02-01"}]';
  responseHandler("/perioder", periods, res);
});

app.get("/handler", function (req, res) {
  const sales =
    '[{"id":"1","chainName":"Våre sjapper","storeName":"Sjappa på hjørnet","customerName":"Laura Tørrbjørkhaugen","ts":"2024-02-01 12:01:15","amount":"11.50"}]';
  responseHandler("/handler", sales, res);
});

app.get("/bong", function (req, res) {
  const sales =
    '[{"id":"1","storeId":"1","storeName":"Sjappa på hjørnet","registerNo":"1","chainName":"Våre sjapper","customerId":"1","customerName":"Laura Tørrbjørkhaugen","ts":"2024-02-01 12:01:15","amount":"11.50"}]';
  responseHandler("/bong", sales, res);
});

app.get("/varelinjer", function (req, res) {
  const lines =
    '[{"id":"1","articleId":"1","articleName":"Hubba Bubba","unitCount":"1","amount":"11.50"}]';
  responseHandler("/varelinjer", lines, res);
});

app.get("/bonus", function (req, res) {});

app.get("/grunnlag", function (req, res) {});

app.get("/login", function (req, res) {
  const usertype = '[{"usertype":"A","usertypename":"Administrator"}]';
  responseHandler("/login", usertype, res);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
