const Product = require('../models/Product');


exports.getAllProducts = async (req, res, next) => {
    await Product.find()
    .populate('userId')
    .then(product => res.status(200).json({ product }))
    .catch(error => res.status(400).json({ error: error }));
   };

exports.getOneProduct = async (req, res, next) => {
    await Product.findOne({ _id: req.params.id })
    .populate('userId')
    .then(product => res.status(200).json({ product }))
    .catch(error => res.status(400).json({ error: error }));
 };

exports.createOneProduct = (req, res, next) => {
    const product = new Product({
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    // .save enregistre les données dans la base.
    product.save()
      .then(product => res.status(201).json({ product }))
      .catch(error => res.status(400).json({ error: error }));
};

exports.modifyProduct = (req, res, next) => {
    const newProduct = req.file ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    console.log(newProduct);
    Product.updateOne({ _id: req.params.id }, { ...newProduct, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Modified!'}))
    .catch(error => res.status(400).json({ error: error }));
};

exports.deleteProduct = (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Deleted!'}))
    .catch(error => res.status(400).json({ error: error }));
};