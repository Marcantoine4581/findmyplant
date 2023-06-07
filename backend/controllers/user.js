const User = require('../models/User');

exports.signup = (req, res, next) => {
    const user = new User({
        ...req.body
        /* userName: req.body.userName,
        email: req.body.email,
        password: req.body.password */
    });
    user.save()
  .then(() => { res.status(201).json({message: 'Utilisateur créé !'})})
  .catch(error => { res.status(400).json( { error })});
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
      if (user && user.email === req.body.email && user.password === req.body.password) {
        res.status(200).json({
          userId: user._id,
          token: 'TOKEN'
        });
      } else {
        res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'});
      }
    })
    .catch(error => {
      res.status(500).json( {error} );
    })
};