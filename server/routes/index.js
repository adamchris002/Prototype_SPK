const routes = require('express').Router();

const userRoutes = require("./users")
const vendorRoutes = require("./vendors")

routes.use("/user", userRoutes);
routes.use("/vendor", vendorRoutes)

module.exports = routes;