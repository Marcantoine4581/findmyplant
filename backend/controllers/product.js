const Product = require('../models/Product');
const fs = require('fs');


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

exports.modifyProduct = async (req, res, next) => {
    // Verify if an image is uploaded in order to delete the old image.
    if (req.file) {
        const existingProduct = await Product.findOne({ _id: req.params.id });
        const oldImagePath = existingProduct.imageUrl;
        if (oldImagePath) {
            const filename = oldImagePath.split('/images/')[1];
            // Delete the old image
            fs.unlink(`images/${filename}`, (error) => {
                if (error) console.log(error);
                else {
                    console.log("Deleted file");
                } 
            })
        }
    }
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
    Product.findOne({ _id: req.params.id})
       .then(product => {
            const filename = product.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Product.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Deleted!'}))
                    .catch(error => res.status(400).json({ error: error }));
            });
       })
       .catch( error => {
            res.status(500).json({ error });
    });
};