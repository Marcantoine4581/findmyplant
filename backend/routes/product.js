const express = require('express');
const router = express.Router();

const productCtrl = require('../controllers/product');

router.get('/', productCtrl.getAllProducts);
router.get('/:id', productCtrl.getOneProduct);
router.post('/', productCtrl.createOneProduct);
router.put('/:id', productCtrl.modifyProduct);
router.delete('/:id', productCtrl.deleteProduct);

module.exports = router;