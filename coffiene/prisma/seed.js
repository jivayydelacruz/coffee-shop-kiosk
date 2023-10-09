const { supabase } = require("../src/supabase");

(async () => {
  const { data, error } = await supabase.from("menu").insert([
    {
      productId: "001",
      productName: "Coffee Milk",
      description: "Ice americano + fresh milk",
      price: 55,
      image: "https://i.imgur.com/CxvqFJN.jpg",
    },
    {
      productId: "002",
      productName: "Cocoa Caramel Latte",
      description: "Steamed milk with mocha and caramel sauces",
      price: 150,
      image: "https://i.imgur.com/yxCP0p3.jpg",
    },
    {
      productId: "003",
      productName: "Nitro Cold Brew",
      description: "Cold brew with nitrogen, without sugar, velvety crema",
      price: 75,
      image: "https://i.imgur.com/GJq8h09.png",
    },
    {
      productId: "004",
      productName: "Caffe Mocha",
      description: "Espresso with mocha sauce, milk, and whipped cream",
      price: 120,
      image: "https://i.imgur.com/e2m49ld.jpg",
    },
  ]);

  if (error) {
    console.log("[DATABASE] : Something went wrong when inserting the seeder");
    console.log(error);
  }

  if (data) {
    console.log("[DATABASE] : Inserting the seeder are successful!");
  }
})();
