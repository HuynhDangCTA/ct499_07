const express = require('express');
const router = express.Router();
const API = require('../controllers/api');


const multer = require("multer");

//uploads file
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

let upload = multer({
  storage: storage,
}).single("image");

router.get('/', API.fetchAllPost);
router.get('/:id', API.fetchByid);
router.post('/',upload, API.create);
router.patch('/:id',upload, API.update);
router.delete('/:id', API.delete);


module.exports = router;