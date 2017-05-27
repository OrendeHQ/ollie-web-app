const { Item } = require('../db/models');
const imgur = require('imgur');
imgur.setClientId(process.env.IMGUR_CLIENT_ID);
imgur.setAPIUrl('https://api.imgur.com/3/');

module.exports = {

  // POST /api/item
  createNewItem(req, res) {
    const {
      series_id, model_number, description, wattage, lamp_base, lamp_life,
      color_temp, price
    } = req.body;
    const { file } = req;
    imgur.uploadFile(`tmp/uploads/${file.filename}`)
      .then((uploaded) => {
        return new Item({
          series_id, model_number, description, wattage, lamp_base, lamp_life,
          color_temp, price, picture: uploaded.data.link
        }).save();
      })
      .then((item) => {
        res.status(201).json({ item });
      })
      .catch((err) => {
        res.status(500).json({ message: JSON.stringify(err) });
      });
  },

  // PUT /api/item
  editItem(req, res) {
    const {
      id,
      series_id, model_number, description, wattage, lamp_base, lamp_life,
      color_temp, price
    } = req.body;
    const { file } = req;
    if (file) {
      imgur.uploadFile(`tmp/uploads/${file.filename}`)
        .then((uploaded) => {
          return Item.forge({ id }).save({
            series_id, model_number, description, wattage, lamp_base, lamp_life,
            color_temp, price, picture: uploaded.data.link
          });
        })
        .then((item) => {
          res.status(200).json({ item });
        })
        .catch((err) => {
          res.status(500).json({ message: JSON.stringify(err) });
        });
    } else {
      Item.forge({ id }).save({
        series_id, model_number, description, wattage, lamp_base, lamp_life,
        color_temp, price
      }).then(() => {
        return Item.where({ id }).fetch();
      }).then((item) => {
        res.status(200).json({ item });
      }).catch((err) => {
        res.status(500).json({ message: JSON.stringify(err) });
      });
    }
  },

  // DELETE /api/item/:id
  deleteItem(req, res) {
    const { id } = req.params;
    Item.forge({ id }).destroy().then(() => {
      res.status(200).json({});
    }).catch((err) => {
      res.status(500).json({ message: JSON.stringify(err) });
    });
  },

  // GET /api/item/:series_id
  getItemOfSeries(req, res) {
    const { series_id } = req.params;
    Item.where({ series_id }).fetchAll().then((items) => {
      res.status(200).json({ items });
    }).catch((err) => {
      res.status(500).json({ message: JSON.stringify(err) });
    });
  }
};
