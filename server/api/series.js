const { Series } = require('../db/models');

module.exports = {

  // POST /api/series
  createNewSeries(req, res) {
    const { name } = req.body;
    if (typeof name !== 'string') return res.status(422).json({ message: 'Invalid Name' });
    new Series({ name }).save().then((series) => {
      res.status(201).json({ series });
    }).catch((err) => {
      res.status(500).json({ message: JSON.stringify(err) });
    });
  },

  // PUT /api/series
  editSeries(req, res) {
    const { id, name } = req.body;
    if (typeof parseInt(id) !== 'number') return res.status(422).json({ message: 'Invalid ID' });
    if (typeof name !== 'string') return res.status(422).json({ message: 'Invalid Name' });
    Series.forge({ id }).save({ name }).then((series) => {
      res.status(200).json({ series });
    }).catch((err) => {
      res.status(500).json({ message: JSON.stringify(err) });
    });
  },

  // DELETE /api/series/:id
  deleteSeries(req, res) {
    const { id } = req.params;
    if (typeof parseInt(id) !== 'number') return res.status(422).json({ message: 'Invalid ID' });
    Series.forge({ id }).destroy().then(() => {
      res.status(200).json({});
    }).catch((err) => {
      res.status(500).json({ message: JSON.stringify(err) });
    });
  },

  // GET /api/series/all
  getAllSeries(req, res) {
    Series.where({}).fetchAll().then((series) => {
      res.status(200).json({ series });
    }).catch((err) => {
      res.status(500).json({ message: JSON.stringify(err) });
    });
  }
};
