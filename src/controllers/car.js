// External Dependancies
const boom = require("boom");

// Get Data Models
const Car = require("../models/car");
const Brand = require("../models/brand");

module.exports = fastify => ({
  // Get all cars
  getCars: async (req, reply) => {
    try {
      const brandId = req.query.brandId;
      const cars = await Car.find({
        ...(brandId && { brandId: brandname })
      }).exec();

      /*const brand = await Car.findOne()
        .populate({
          path: "brand",
          select: "brandname"
        })
        .exec();*/
      reply.code(200).send(cars);
    } catch (err) {
      throw boom.boomify(err);
    }
  },

  // Get single car by ID
  getSingleCar: async (req, reply) => {
    try {
      const id = req.params.id;
      const car = await Car.findById(id)
        .populate("brand", "brandname")
        .exec();
      reply.code(200).send(car);
    } catch (err) {
      throw boom.boomify(err);
    }
  },

  // Add a new car
  addCar: async (req, reply) => {
    // if(req.params.title)
    try {
      const car = new Car(req.body);
      return car.save();
    } catch (err) {
      throw boom.boomify(err);
    }
  },

  // Update an existing car
  updateCar: async (req, reply) => {
    try {
      const id = req.params.id;
      const car = req.body;
      const { ...updateData } = car;
      const update = await Car.findByIdAndUpdate(id, updateData, { new: true });
      return update;
    } catch (err) {
      throw boom.boomify(err);
    }
  },

  // Delete a car
  deleteCar: async (req, reply) => {
    try {
      const id = req.params.id;
      const car = await Car.findByIdAndRemove(id);
      console.log("Deleted Succesfully");
      return car;
    } catch (err) {
      throw boom.boomify(err);
    }
  }
});
