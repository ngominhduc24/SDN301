// fileExtensionMiddleware.js

const path = require('path');

const checkFileExtension = (allowedExtensions) => {
  return (req, res, next) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const fileExtension = path.extname(req.file.originalname).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      return res.status(400).send('Invalid file type.');
    }

    next();
  };
};

module.exports = checkFileExtension;
