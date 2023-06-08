const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
require('dotenv').config()
const Product = require('./models/Product');

mongoose.connect(process.env.DB_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true }) // no longer supported options
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Middleware qui extrait le corp JSON. 
app.use(express.json());

app.use('/api/plants', (req, res) => {
    fs.readFile('noms.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Erreur lors de la lecture du fichier JSON :', err);
          res.status(500).json({ error: 'Erreur lors de la lecture du fichier JSON' });
          return;
        }
        const jsonData = JSON.parse(data);
        res.status(200).json(jsonData);
    });
});

/* app.use('/api/products', (req, res, next) => {
  const products = [
    {
      _id: 'oeihfzeoi',
      userId: 'Michel',
      plantName: 'Rose jaune',
      condition: 'Je vends',
      price: 1000,
      comment: 'Les infos de mon premier objet',
      createdAt: '24/05/2023',
      status: true,
      imageUrl: 'https://images.pexels.com/photos/133472/pexels-photo-133472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      _id: 'sfghmdfhgxdu',
      userId: 'Louis',
      plantName: 'Rose jaune',
      condition: 'Je donne',
      price: 1000,
      comment: 'Les infos de mon premier objet',
      createdAt: '15/05/2023',
      status: false,
      imageUrl: 'https://images.pexels.com/photos/133472/pexels-photo-133472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];
  res.status(200).json(products);
}); */

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

/* app.post('/api/products/', (req, res, next) => {
const product = new Product({
  ...req.body
});
// .save enregistre les données dans la base.
product.save()
  .then(product => res.status(201).json({ product }))
  .catch(error => res.status(400).json({ error }));
});

app.put('/api/products/:id', (req, res, next) => {
Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
.then(() => res.status(200).json({ message: 'Modified!'}))
.catch(error => res.status(400).json({ error }));
});

app.delete('/api/products/:id', (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Deleted!'}))
  .catch(error => res.status(400).json({ error }));
}); */

module.exports = app;