//Express
const express = require('express');
const router = express.Router();
const app = express()

//Accesorios
const jwt = require('jsonwebtoken')

//engines
app.set('view engine', 'ejs')

//Modelos
const Usuario = require('../models/Usuario')

var bcrypt = require('bcryptjs');


//Recibir login-form
router.post('/', function(req, res, next) {

  if (req.body.cedula) {

    Usuario.find({cedula: req.body.cedula}, function (err, data) {
      if (err) throw err
  
      if (data.length > 0) {
  
        if ((req.body.password !== "") && bcrypt.compareSync(req.body.password, data[0].password)) {


          //Generate Token
          const user = {'_id': data[0]['_id']}

          jwt.sign({user}, 'secretKey', (err, token) => {

            if(err) throw err;

            res.send(token); 
          })

        }
        else res.sendStatus(403)
  
      } else res.sendStatus(403)   

    })
  } else res.send("ingrese su cedula")



});


module.exports = router;
