const vendorRoutes = require("express").Router();
const { VendorController } = require("../controllers");

vendorRoutes.get("/getVendors", VendorController.getVendors);
vendorRoutes.delete("/deleteVendor/:id", VendorController.deleteVendors);
vendorRoutes.post("/addVendor", VendorController.addVendor);
vendorRoutes.put("/updateVendor/:id", VendorController.updateVendor)

module.exports = vendorRoutes;
