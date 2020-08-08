const express = require("express");
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.static('public'))
app.use(expressLayout);
app.set("views", path.join(__dirname, path.join("./resources/views")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/cart",(req,res)=>{
  res.render('customers/carts')
})
app.get("/login",(req,res)=>{
  res.render('auth/login')
})
app.get("/register",(req,res)=>{
  res.render('auth/register')
})
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
