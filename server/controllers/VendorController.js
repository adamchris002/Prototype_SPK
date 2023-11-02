const { vendor } = require("../models");

class VendorController {
  static async updateVendor(req, res) {
    try {
      const id = Number(req.params.id);
      const {
        name,
        price,
        kualitas_bahan,
        model_seragam,
        waktu_pengerjaan,
        kualitas_produk,
        tempo_pembayaran,
      } = req.body;

      const result = await vendor.update(
        {
          name,
          price,
          kualitas_bahan,
          model_seragam,
          waktu_pengerjaan,
          kualitas_produk,
          tempo_pembayaran,
        },
        {
          where: { id },
        }
      );
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  }
  static async getVendors(req, res) {
    try {
      const result = await vendor.findAll();
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  }
  static async deleteVendors(req, res) {
    try {
      const id = Number(req.params.id);
      let result = await vendor.destroy({
        where: { id },
      });
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  }
  static async addVendor(req, res) {
    try {
      const {
        name,
        price,
        kualitas_bahan,
        model_seragam,
        waktu_pengerjaan,
        kualitas_produk,
        tempo_pembayaran,
      } = req.body;

      const result = await vendor.create({
        name,
        price,
        kualitas_bahan,
        model_seragam,
        waktu_pengerjaan,
        kualitas_produk,
        tempo_pembayaran,
      });
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = VendorController;
