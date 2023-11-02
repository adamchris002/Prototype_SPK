const routes = require('express').Router();

const userRoutes = require("./users")
const vendorRoutes = require("./vendors")
const hasilRoutes = require("./hasils")

routes.use("/user", userRoutes);
routes.use("/vendor", vendorRoutes)
routes.use('/hasil', hasilRoutes);

module.exports = routes;