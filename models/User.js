const mongoose = require('mongoose');
const validator = require ('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema

const userSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
    },
    apellido: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true,
        validate (value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email');
            }
        }
    },
    CIV: {
        type: Number,
        trim: true
    },
    cedula: {
        type: Number,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true,
    },
    voto: {
        type: Schema.Types.ObjectId,
        ref: 'Voto'
    },
    sesion: {
        type: Boolean,
        default: false,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const { _id } = user;
    const token = jwt.sign({ _id }, 'testKey');
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
   
    const user = await User.findOne({ email });

    if (!user) {
        throw Error("Invalid User/Password");
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
        throw Error("Invalid User/Password");
    }

    return user;
    
}

userSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = bcrypt.hashSync(user.password, 8);
    }

    next();
});

const User = mongoose.model('User', userSchema)

module.exports = { User, userSchema }