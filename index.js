const express = require("express");
const url = require("url");
const PORT = process.env.PORT || 3001;

const app = express();

var status400 = false;
var status401 = false;
var status503 = false;
var dberror = false;

process.argv.forEach(function(value, idx, array)
{
    console.log(idx + ": " + value );
    if (value === "status400")
        status400 = true;

    if (value === "status401")
        status401 = true;

    if (value === "status503")
        status503 = true;

    if (value === "dberror")
        dberror = true;

})

console.log("MockServer starts with:");
console.log("status400:     " + status400);
console.log("status401:     " + status401);
console.log("status503:     " + status503);
console.log("dberror  :     " + dberror);

app.get('/varegrupper', function(req, res) 
{
    if (status400)
    {
        console.log("Feil /varegrupper: 400");
        res.status(400).json({"errormsg":"Feil"}).send();
    }
    else if (status401)
    {
        console.log("Feil /varegrupper: 401");
        res.status(401).json({"errormsg":"Feil"}).send();
    }
    else if (status503)
    {
        console.log("Feil /varegrupper: 503");
        res.status(503).json({"errormsg":"Feil"}).send();
    }
    else if (dberror)
    {
        console.log("Feil /varegrupper: dberror");
        res.status(500).json({"errormsg":"Feil"}).send();
    }
    else
    {
        const categories = '[{"id":"1","name":"Godteri"}]';
        res.json({ message: JSON.parse(categories) }); 
    }

});

app.get('/kommuner', function(req, res) 
{
    const municipalities = '[{"id":"0","name":"Ukjent kommune"},{"id":"1","name":"Sandefjord"}]';
    res.json({ message: JSON.parse(municipalities) }); 
});

app.get('/butikker', function(req, res) 
{
    const stores = '[{"id":"1","name":"Sjappa på hjørnet","municipalityName":"Sandefjord","countyName":"Vestfold"}]';
    res.json({ message: JSON.parse(stores) }); 
});

app.get('/kasse4bruker', function(req, res) 
{
//butikk.butikk_nr as storeId, butikk_nv as storeName, kasse_nr as registerNo, kjede.kjede_nr as chainId, kjede_nv as chainName    
    const registers = '[{"id":"1","name":"Sjappa på hjørnet","registerNo":"1","chainId":"1","chainName":"Våre sjapper"}]';
    res.json({ message: JSON.parse(registers) }); 
});

app.get('/varer4kasse', function(req, res) 
{
    const articles = `[{"id":"1","name":"Hubba Bubba"}
    ,{"id":"2","name":"Dundersalt"}
    ,{"id":"3","name":"Fox"}
    ,{"id":"4","name":"Rex"}]`;
    res.json({ message: JSON.parse(articles) }); 
});

app.get('/varer4generering', function(req, res) 
{
});

app.get('/vare4kasse', function(req, res) 
{
    var q = url.parse(req.url, true);
    var qdata = q.query;
    let articleId = qdata.articleid;

    let article = "";
    switch (articleId)
    {
        case "1":
            article = '[{"id":"1","name":"Hubba Bubba","amountType":1,"amountTypeName":"Stk","unitPrice":"11.50"}]';
            break;
        case "2":
            article = '[{"id":"2","name":"Dundersalt","amountType":1,"amountTypeName":"Stk","unitPrice":"23.90"}]';
            break;
        case "3":
            article = '[{"id":"3","name":"Fox","amountType":1,"amountTypeName":"Stk","unitPrice":"2.50"}]';
            break;
        case "4":
            article = '[{"id":"4","name":"Rex","amountType":1,"amountTypeName":"Stk","unitPrice":"2.50"}]';
            break;
        default:
            article = "[]";
    }
    res.json({ message: JSON.parse(article) }); 
});

app.get('/brukertyper', function(req, res) 
{
    const usertypes = '[{"id":"K","name":"Kasseoperatør"}]';
    res.json({ message: JSON.parse(usertypes) }); 
});

app.put('/nybruker', function(req, res) 
{
    res.status(200).json(req.body).send();
});

app.put('/nyhandel', function(req, res) 
{
    res.status(200).json(req.body).send();
});

app.get('/kunder', function(req, res) 
{
    if (status400)
    {
        console.log("Feil /kunder: 400");
        res.status(400).json({"errormsg":"Feil"}).send();
    }
    else if (status401)
    {
        console.log("Feil /kunder: 401");
        res.status(401).json({"errormsg":"Feil"}).send();
    }
    else if (status503)
    {
        console.log("Feil /kunder: 503");
        res.status(503).json({"errormsg":"Feil"}).send();
    }
    else if (dberror)
    {
        console.log("Feil /kunder: dberror");
        res.status(500).json({"errormsg":"Feil"}).send();
    }
    else
    {
        const customers = '[{"id":"1","name":"Laura Tørrbjørkhaugen","isDeletable":0,"municipalityName":"Sandefjord","countyName":"Vestfold"}]';
        res.json({ message: JSON.parse(customers) }); 
    }
});

app.delete('/slettkunde', function(req, res) 
{
    res.status(200).json(req.body).send();
});

app.put('/nykunde', function(req, res) 
{
    res.status(200).json(req.body).send();
});

app.put('/oppdaterkunde', function(req, res) 
{
    res.status(200).json(req.body).send();
});

app.get('/perioder', function(req, res) 
{
    const periods = '[{"id":"202402","firstsale":"2024-02-01"}]';
    res.json({ message: JSON.parse(periods) }); 
});

app.get('/handler', function(req, res)
{
    const sales = '[{"id":"1","chainName":"Våre sjapper","storeName":"Sjappa på hjørnet","customerName":"Laura Tørrbjørkhaugen","ts":"2024-02-01 12:01:15","amount":"11.50"}]';
    res.json({ message: JSON.parse(sales) }); 
});
  
app.get('/bong', function(req, res) 
{
    const sales = '[{"id":"1","storeId":"1","storeName":"Sjappa på hjørnet","registerNo":"1","chainName":"Våre sjapper","customerId":"1","customerName":"Laura Tørrbjørkhaugen","ts":"2024-02-01 12:01:15","amount":"11.50"}]';
    res.json({ message: JSON.parse(sales) }); 
});

app.get('/varelinjer', function(req, res) 
{
    const lines = '[{"id":"1","articleId":"1","articleName":"Hubba Bubba","unitCount":"1","amount":"11.50"}]';
    res.json({ message: JSON.parse(lines) }); 
});

app.get('/bonus', function(req, res) 
{

});

app.get('/grunnlag', function(req, res) 
{

});

app.get('/login', function(req, res) 
{
    const usertype = '[{"usertype":"A","usertypename":"Administrator"}]';
    res.json({ message: JSON.parse(usertype) }); 
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});