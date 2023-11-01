const vendorRoutes = require("express").Router();
const { VendorController } = require("../controllers");

vendorRoutes.get("/getVendors", VendorController.getVendors);
vendorRoutes.delete("/deleteVendor", VendorController.deleteVendors);
vendorRoutes.post("/addVendor", VendorController.addVendor);

module.exports = vendorRoutes;
