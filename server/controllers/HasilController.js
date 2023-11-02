const { hasil } = require("../models");

class HasilController {
    static async getAllHasil(req, res){ 
        try {
            let result = await hasil.findAll();
            res.json(result);
        } catch (err) {
            res.json(err)
        }
    }
    static async addHasil(req, res) {
        try {
            const {name, nilai_tertinggi} = req.body
            let result = await hasil.create({
                name,
                nilai_tertinggi
            })
            res.json(result)
        } catch (err) {
            res.json(err)
        }
    }

}

module.exports = HasilController