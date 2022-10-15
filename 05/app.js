const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

//this use would allways runs
app.use("/", (req, res, next) => {
  next(); // allow the request to countinue to the next middleware
});

app.use("/add-product", (req, res, next) => {
  console.log("first");
  res.send("<form action='/product' method='POST'><input type='text' name='title'><button>Add Product</button></form>"); // send the response
});

//another difference of get vs use is that 'get' would match the url with the exact provided path
//app.get , app.post , app.put and app.delete are the other forms of app.use but only triggers for that specific method
app.post('/product', (req, res) => {
    const body = req.body;
    console.log(body);
    res.redirect('/add-product');
})

app.use("/", (req, res, next) => {
  console.log("secound req");
  res.send("<h1>Hello from Second</h1>");
});

app.listen(3000);
