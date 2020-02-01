"use strict";

module.exports = async (fastify, opts) => {
  // Import our Controllers
  const carController = require("../controllers/car")(fastify);
  const brand = require("../controllers/brand")(fastify);
  const user = require("../controllers/user")(fastify);
  const pdf = require("../controllers/pdf")(fastify);

  fastify
    .get("/cars", carController.getCars)
    .get("/cars/:id", carController.getSingleCar)
    .post("/cars", carController.addCar)
    .put("/cars/:id", carController.updateCar)
    .delete("/cars/:id", carController.deleteCar)
    .get("/brands", brand.getBrands)
    .post("/brands", brand.addBrand)
    .post("/signup", user.signUp)
    .get("/users", user.getUser)
    .post("/login", user.loginUser)
    .get("/pdf", pdf.printPDF);
  // .get("/brands/:brandId/cars")

  /*const routes = [
    {
      method: "GET",
      url: "/api/cars",
      handler: carController.getCars
    },
    {
      method: "GET",
      url: "/api/cars/:id",
      handler: carController.getSingleCar
    },
    {
      method: "POST",
      url: "/api/cars",
      handler: carController.addCar
      //schema: documentation.addCarSchema
    },
    {
      method: "PUT",
      url: "/api/cars/:id",
      handler: carController.updateCar
    },
    {
      method: "DELETE",
      url: "/api/cars/:id",
      handler: carController.deleteCar
    }
  ];

  module.exports = routes;
  */
};
