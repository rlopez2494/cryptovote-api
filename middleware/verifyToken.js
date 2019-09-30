/**
 * Middleware para verificar el token de usuario en la peticion
 * HTTP y a su vez obtener el usuario asociado (si existe)
 * 
 * @author Anderson Salas <andersalasm@gmail.com>
 * @author Robert Lopez <rlopez@rlopez.com>
 * @license Propietary
 */

 module.exports = async function(req, res, next) {

    //Extraer token del header
    const bearerHeader = req.body.headers['authorization']

    //verificar si es nulo
    if (typeof bearerHeader !== 'undefined') {

        //Separar string por espacios
        const bearer = bearerHeader.split(' ');

        //extraer token
        const bearerToken = bearer[1];

        //Asignar token
        req.token = bearerToken;

        //middleware function "next()" 
        next();
    }

    else {
        res.sendStatus(403)
    }
 }