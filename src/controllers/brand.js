const boom = require("boom");

// Get Data Models
const Brand = require("../models/brand");

module.exports = fastify => ({
  getBrands: async (req, reply) => {
    try {
      const brands = await Brand.find();
      return brands;
    } catch (err) {
      throw boom.boomify(err);
    }
  },
  addBrand: async (req, reply) => {
    // if(req.params.title)
    try {
      const brand = new Brand(req.body);
      return brand.save();
    } catch (err) {
      throw boom.boomify(err);
    }
  }
});
