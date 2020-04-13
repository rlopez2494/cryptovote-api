const jwt = require('jsonwebtoken');
const { User } = require('../models/User');


authenticate = async (req, res, next) => {

    try {
        
        //Extraer token del header
        const bearerHeader = req.header('Authorization');

        const token = bearerHeader.replace('Bearer ', '');

        const decoded = jwt.verify(token, 'testKey');

        console.log(decoded._id);

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        req.user = user;
    
        next();

    } catch (error) {
        res.status(401).send('Please authenticate');
    }

}

module.exports = authenticate;