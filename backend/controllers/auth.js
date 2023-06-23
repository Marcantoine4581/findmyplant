const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = async (req, res, next) => {
  // Vérifiez si l'e-mail est déjà utilisé
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    // L'e-mail est déjà utilisé, renvoie une réponse d'erreur
    return res.status(409).json({ message: 'Cet e-mail est déjà utilisé.' });
  } else {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          userName: req.body.userName,
          email: req.body.email,
          password: hash,
          adress: {
            street: '',
            city: req.body.adress.city,
            postalCode: req.body.adress.postalCode,
            country: ''
          }
        });
        user.save()
          .then(() => { res.status(201).json({ message: 'Utilisateur créé !' }) })
          .catch(error => { res.status(400).json({ error }) });
      })
      .catch(error => res.status(500).json({ error }));
  }
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.SECRET_TOKEN,
              { expiresIn: '1h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

/* Ce code fonctionne mais le pwd est crypté

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
    }

    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!valid) {
      return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, { expiresIn: '1h' });

    res.status(200).json({
      userId: user._id,
      userName: user.userName,
      token: token
    });
  } catch (error) {
    res.status(500).json({ error });
  }
}; */



/* Ce code fonctionne mais le pwd n'est pas crypté

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user && user.email === req.body.email && user.password === req.body.password) {
        res.status(200).json({
          userId: user._id,
          userName: user.userName,
          token: jwt.sign(
            { userId: user._id },
            process.env.SECRET_TOKEN,
            { expiresIn: '1h' }
          )
        });
      } else {
        res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    })
}; */