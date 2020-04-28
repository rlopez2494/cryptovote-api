const mongoose = require('mongoose');
const validator = require ('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
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
    voto: {
        type: Schema.Types.ObjectId,
        ref: 'Voto'
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
    },
    token: {
        type: String
    }
});

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const { _id } = user;
    const token = jwt.sign({ _id }, process.env.JWT_SECRET, {expiresIn: '1 hour'});
    user.token = token;
    await user.save();
}

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;

    return userObject;
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

// Hash the plain text password before saving
userSchema.pre('save', function (next) {
    const user = this;

    // Check if the user has changed the password before hashing it 
    if (user.isModified('password')) {
        user.password = bcrypt.hashSync(user.password, 8);
    }

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = { User, userSchema }