const User = require('../models/User');
const Product = require('../models/Product');

exports.getAllUser = (req, res) => {
    User.find()
    .then(user => res.status(200).json({ user }))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneUser = (req, res) => {
    User.findOne({ _id: req.params.id })
    .then(user => res.status(200).json({ user }))
    .catch(error => res.status(400).json({ error }));
};

exports.getAllProductByUser = (req, res) => {
    // Rechercher l'utilisateur par ID
  User.findOne({ _id: req.params.id })
  .then(user => {
    // Vérifier si l'utilisateur existe
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    // Récupérer tous les produits
    Product.find({ userId: user._id })
      .then(products => res.status(200).json({ user, products }))
      .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(400).json({ error }));
};

exports.modifyUser = (req, res, next) => {
  User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Modified!'}))
  .catch(error => res.status(400).json({ error }));
};