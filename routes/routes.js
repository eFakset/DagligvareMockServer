const express = require("express");
const router = express.Router();
const getKommuner = require("./kommuner");
const getVaregrupper = require("./varegrupper");
const getButikker = require("./butikker");
const getKasse4bruker = require("./kasse4bruker");
const getVarer4kasse = require("./varer4kasse");

router.get("/test", function (req, res) {
  const reqResponse = "Test response";
  console.log("ENDPOINT: /test" + " ReqResponse: ", reqResponse);
  return res.status(200).json({ message: "200 OK", reqResponse });
});

router.get("/varegrupper", function (req, res) {
  getVaregrupper(req, res);
});

router.get("/kommuner", function (req, res) {
  getKommuner(req, res);
});

router.get("/butikker", function (req, res) {
  getButikker(req, res);
});

router.get("/kasse4bruker", function (req, res) {
  getKasse4bruker(req, res);
});

router.get("/varer4kasse", function (req, res) {
  getVarer4kasse(req, res);
});

router.get("/varer4generering", function (req, res) {
  console.log("/varer4generering");
});

module.exports = router;

//----------

// app.get("/brukertyper", function (req, res) {
//   const usertypes = '[{"id":"K","name":"Kasseoperatør"}]';
//   res.json({ message: JSON.parse(usertypes) });
// });

// app.put("/nybruker", function (req, res) {
//   res.status(200).json(req.body).send();
// });

// app.put("/nyhandel", function (req, res) {
//   res.status(200).json(req.body).send();
// });

// app.get("/kunder", function (req, res) {
//   if (status400) {
//     console.log("Feil /kunder: 400");
//     res.status(400).json({ errormsg: "Feil" }).send();
//   } else if (status401) {
//     console.log("Feil /kunder: 401");
//     res.status(401).json({ errormsg: "Feil" }).send();
//   } else if (status503) {
//     console.log("Feil /kunder: 503");
//     res.status(503).json({ errormsg: "Feil" }).send();
//   } else if (dberror) {
//     console.log("Feil /kunder: dberror");
//     res.status(500).json({ errormsg: "Feil" }).send();
//   } else {
//     const customers =
//       '[{"id":"1","name":"Laura Tørrbjørkhaugen","isDeletable":0,"municipalityName":"Sandefjord","countyName":"Vestfold"}]';
//     res.json({ message: JSON.parse(customers) });
//   }
// });

// app.delete("/slettkunde", function (req, res) {
//   res.status(200).json(req.body).send();
// });

// app.put("/nykunde", function (req, res) {
//   res.status(200).json(req.body).send();
// });

// app.put("/oppdaterkunde", function (req, res) {
//   res.status(200).json(req.body).send();
// });

// app.get("/perioder", function (req, res) {
//   const periods = '[{"id":"202402","firstsale":"2024-02-01"}]';
//   res.json({ message: JSON.parse(periods) });
// });

// app.get("/handler", function (req, res) {
//   const sales =
//     '[{"id":"1","chainName":"Våre sjapper","storeName":"Sjappa på hjørnet","customerName":"Laura Tørrbjørkhaugen","ts":"2024-02-01 12:01:15","amount":"11.50"}]';
//   res.json({ message: JSON.parse(sales) });
// });

// app.get("/bong", function (req, res) {
//   const sales =
//     '[{"id":"1","storeId":"1","storeName":"Sjappa på hjørnet","registerNo":"1","chainName":"Våre sjapper","customerId":"1","customerName":"Laura Tørrbjørkhaugen","ts":"2024-02-01 12:01:15","amount":"11.50"}]';
//   res.json({ message: JSON.parse(sales) });
// });

// app.get("/varelinjer", function (req, res) {
//   const lines =
//     '[{"id":"1","articleId":"1","articleName":"Hubba Bubba","unitCount":"1","amount":"11.50"}]';
//   res.json({ message: JSON.parse(lines) });
// });

// app.get("/bonus", function (req, res) {});

// app.get("/grunnlag", function (req, res) {});

// app.get("/login", function (req, res) {
//   const usertype = '[{"usertype":"A","usertypename":"Administrator"}]';
//   res.json({ message: JSON.parse(usertype) });
// });
