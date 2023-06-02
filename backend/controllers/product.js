const Product = require('../models/Product');


exports.getAllProducts = (req, res, next) => {
    Product.find()
      .then(product => res.status(200).json({ product }))
      .catch(error => res.status(400).json({ error }));
   };

exports.getOneProduct = (req, res, next) => {
    Product.findOne({ _id: req.params.id })
    .then(product => res.status(200).json({ product }))
    .catch(error => res.status(400).json({ error }));
 };

exports.createOneProduct = (req, res, next) => {
    const product = new Product({
      ...req.body
    });
    // .save enregistre les données dans la base.
    product.save()
      .then(product => res.status(201).json({ product }))
      .catch(error => res.status(400).json({ error }));
};

exports.modifyProduct = (req, res, next) => {
    Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Modified!'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteProduct = (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Deleted!'}))
    .catch(error => res.status(400).json({ error }));
};