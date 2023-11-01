const { users } = require("../models");
const { Op } = require("sequelize");

class UserController {
  static async getUserInfo(req, res) {
    try {
      const {username} = req.query
      let result = await users.findOne({
        where: { username: username },
      });
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  }
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      let result = await users.findOne({
        where: { username: username, password: password },
      });
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  }
  static async register(req, res) {
    try {
      const { name, username, password } = req.body;

      let sameUsername = await users.findOne({
        where: {
          username: username,
        },
      });

      if (sameUsername) {
        return res.status(400).json({ error: "Username is already taken" });
      }

      function generateRandomId(length) {
        const min = Math.pow(10, length - 1);
        const max = Math.pow(10, length) - 1;
        const randomId = Math.floor(Math.random() * (max - min + 1)) + min;

        return randomId.toString();
      }
      const userid = generateRandomId(6);
      let result = await users.create({
        userid,
        name,
        username,
        password,
      });

      res.json(result);
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = UserController;
