require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("express-flash");
const passport = require("passport");
const app = express();

const PORT = process.env.PORT || 4000;

//database connection
const mongo_URL = process.env.mongo_URL;
mongoose.connect(mongo_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("database connection successful!..");
  })
  .catch((err) => {
    console.log("connection failed!...");
  });

//session store
let mongoStore = new MongoStore({
  mongooseConnection: connection,
  collection: "sessions",
});

//middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.use(expressLayout);
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //24hrs
  })
);

//passport authentication config
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

//global middleware
app.use((req, res, next) => {
  // req.locals.session = res.session;
  // console.log(req.locals,'global')
  res.locals.session = req.session;
  res.locals.user = req.user;
  console.log(req.session, "global");
  next();
});

//views
app.set("views", path.join(__dirname, path.join("./resources/views")));
app.set("view engine", "ejs");

//routings
require("./routes/web")(app);

//server connection
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
