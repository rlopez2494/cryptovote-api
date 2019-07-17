const Usuario = require('../models/Usuario');
const assert = require('assert');

describe('Usuario Model Tests', function() {

    var newUsuario;

    it('Saves a record to the database', function() {
        newUsuario = new Usuario({
            cedula: 22924952,
            nombre: "Robert Jose",
            apellido: "Lopez Salazar",
            fechaNacimiento: "1994-04-02",
            sexo: "M",
            password: "hola1234",
            correo: "rlopez.rjls@gmail.com",
            isAdmin: false,
            imgUrl: "pc",
            puedeVotar: false
        });

        newUsuario.save(function() {
            Usuario.findOne({nombre: "Robert Jose"}, function(error, data) {
                if (error) throw error;
                //console.log(data);
                assert(data.password == "hola1234");
            })
        })
    });

    
})