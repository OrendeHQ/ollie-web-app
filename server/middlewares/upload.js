const multer = require('multer');
const upload = multer({ dest: 'tmp/uploads' });

module.exports = {
  single(filename) {
    return (req, res, next) => {
      upload.single(filename)(req, res, (err) => {
        if (err) return res.status(500).json({ message: JSON.stringify(err) });
        next();
      });
    };
  }
};
