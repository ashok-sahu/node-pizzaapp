const axios = require("axios");
const noty = require("noty");

let addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.querySelector("#cartCounterVal");

function updateCart(pizza) {
  axios.post("/update-cart", pizza).then((res) => {
    cartCounter.innerText = res.data.totalQty;
    // console.log(res.data.totalQty,'response')
    new noty({
      type: "success",
      timeout: 1000,
      progressBar: false,
      layout: "topRight",
      text: "Item added to cart",
    }).show();
  }).catch(err=>{
    new noty({
        type: "error",
        timeout: 1000,
        progressBar: false,
        layout: "topRight",
        text: "something wents wrong!",
      }).show();
  })
}

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // console.log(e,'button clicked')
    let pizza = JSON.parse(btn.dataset.pizza);
    // console.log(pizza,'pizza clicked')
    updateCart(pizza);
  });
});
