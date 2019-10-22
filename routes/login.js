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

//bcrypt
var bcrypt = require('bcryptjs');


//Recibir login-form
router.post('/', function(req, res, next) {
  console.log(req.body);
  if (req.body.cedula) {

    Usuario.findOne({cedula: req.body.cedula}, function (err, data) {
      if (err) throw err
  
      if (data) {

        if(req.body.isAdmin) {

          if(req.body.isAdmin === data.isAdmin) {

            if ((req.body.password !== "") && bcrypt.compareSync(req.body.password, data.password)) {
  
              //Generate Token
              const user = {
                '_id': data['_id']
              }
    
              jwt.sign({user}, 'secretKey', (err, token) => {
    
                if(err) throw err;
    
                res.send(token); 
              })
  
            } else res.status(403).send("Clave incorrecta");

          } else res.status(403).send("No eres administrador")
          
        } else {

          if ((req.body.password !== "") && bcrypt.compareSync(req.body.password, data.password)) {
  
            //Generate Token
            const user = {
              '_id': data['_id']
            }
  
            jwt.sign({user}, 'secretKey', (err, token) => {
  
              if(err) throw err;
  
              res.send(token); 
            })

          } else res.status(403).send("Clave incorrecta");

        }
  
      } else res.status(401).send("El usuario no existe");

    })
  } else res.send("Ingrese su cedula");



});


module.exports = router;
