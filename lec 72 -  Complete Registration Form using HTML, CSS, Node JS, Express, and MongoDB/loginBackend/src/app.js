
// import
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

// connect to database
require("./db/connect");


// html static
const static_path = path.join(__dirname,"../public");
// console.log(static_path);
app.use(express.static(static_path));

// dynamic page
const templates_path = path.join(__dirname,"../templates/views");
const partial_path = path.join(__dirname,"../templates/partials");

app.set("view engine","hbs");
app.set("views",templates_path);
hbs.registerPartials(partial_path);


app.get('/', (req, res) => {
    res.render("index.hbs");
});

app.get("/register", (req, res) => {
    res.render("register.hbs");
})

app.listen(port,()=>{
    console.log(`port at ${port}`);
});