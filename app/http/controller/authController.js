const User = require("../../model/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

function authController() {
  return {
    login(req, res) {
      res.render("auth/login");
    },
    postLogin(req, res, next) {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }
        if (!user) {
          req.flash("error", info.message);
          return res.redirect("/login");
        }
        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }
          return res.redirect("/");
        });
      })(req, res, next);
    },
    register(req, res) {
      res.render("auth/register");
    },
    async postRegister(req, res) {
      const { name, email, password } = req.body;
      console.log(req.body, "req.body from form");

      if (!name || !email || !password) {
        req.flash("error", "All fields are required!");
        req.flash("name", name);
        req.flash("email", email);
        return res.redirect("/register");
      }

      //check exist  password
      User.exists({ email: email }, (err, result) => {
        if (result) {
          req.flash("error", "email already exists");
          req.flash("name", name);
          req.flash("email", email);
          return res.redirect("/register");
        }
      });

      //hashing password
      const hashedPassword = await bcrypt.hash(password, 10);

      //create a new user
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });
      user
        .save()
        .then((user) => {
          return res.redirect("/");
        })
        .catch((err) => {
          req.flash("error", "Something wents wrong!");
          return res.redirect("/register");
        });
    },
    logout(req,res,next){
      req.logout()
      return res.redirect('/login')
    },
  };
}

module.exports = authController;
