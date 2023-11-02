const hasilRoutes = require("express").Router();
const { HasilController } = require("../controllers");

hasilRoutes.get("/getAllHasil", HasilController.getAllHasil);
hasilRoutes.post("/addHasil", HasilController.addHasil);

module.exports = hasilRoutes;