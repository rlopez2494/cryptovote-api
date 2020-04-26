const jwt = require('jsonwebtoken');
const { User } = require('../models/User');


authenticate = async (req, res, next) => {

    try {
        
        //Extraer token del header
        const bearerHeader = req.header('Authorization');
        
        const token = bearerHeader.replace('Bearer ', '');
        
        const decoded = jwt.verify(token, 'testKey');
      
        const user = await User.findOne({ _id: decoded._id, 'token': token });
        
            if(!user) {
            return res.status(401).send({ message: 'NOT_AUTHORIZED' });
        }
        
        req.user = user;
        req.token = token;

        next();

    } catch (error) {
        res.status(401).send({ message: 'NOT_AUTHORIZED' });
    }

}

module.exports = authenticate;