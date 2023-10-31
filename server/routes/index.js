const routes = require('express').Router();

const userRoutes = require("./users")

routes.use("/user", userRoutes);

module.exports = routes;