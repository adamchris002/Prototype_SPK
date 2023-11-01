const userRoutes = require("express").Router();
const { UserController } = require("../controllers");

userRoutes.post("/register", UserController.register);
userRoutes.post("/login", UserController.login);
userRoutes.get("/getInfo", UserController.getUserInfo)

module.exports = userRoutes;