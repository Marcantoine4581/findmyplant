const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.get('/', userCtrl.getAllUser);
router.get('/:id', userCtrl.getOneUser);
router.get('/:id/products', userCtrl.getAllProductByUser);


module.exports = router;