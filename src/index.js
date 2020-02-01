// Require the framework and instantiate it
const fastifyCORS = require("fastify-cors");
const fastify = require("fastify")({
  logger: true
});
// Require external modules
const mongoose = require("mongoose");

// Import Routes
const routes = require(`./routes`);

// Import Swagger Options
const swagger = require("./config/swagger");

// Register Swagger
fastify
  .register(require("fastify-swagger"), swagger.options)
  .register(require("fastify-sensible"))
  .register(require("fastify-jwt"), { secret: "supersecret" })
  .register(routes, {
    prefix: "/api"
  })
  .register(fastifyCORS, {
    origin: true,
    credentials: true
  });

// Connect to DB
mongoose
  .connect(`mongodb://localhost/mycargarage`)
  .then(() => console.log(`MongoDB connected…`))
  .catch(err => console.log(err));

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3006);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
