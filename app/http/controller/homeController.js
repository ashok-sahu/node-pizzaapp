const Menu = require("../../model/menu");

function homeController() {
  return {
    async index(req, res) {
      const Pizzas = await Menu.find();
      // console.log(Pizzas)
      res.render("home", { pizzas: Pizzas });
    },
  };
}
module.exports = homeController;
