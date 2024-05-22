const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_id: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { autoIndex: true });

userSchema.pre('save', function(next) {
    if (!this.user_id) {
        this.user_id = this._id.toString();
    }
    next();
});

// static signup method
userSchema.statics.signup = async function (email, username, password) {
    // Basic validation
    if (!email || !username || !password) {
        throw Error('Email, username, and password are required');
    }

    const exists = await this.findOne({ email });

    if (exists) {
        throw Error('User with this email already exists');
    }

    const user = await this.create({ email, username, password });
    
    return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
    // Basic validation
    if (!email || !password) {
        throw Error('Email and password are required');
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw Error('User with this email does not exist');
    }

    if (password !== user.password) {
        throw Error('Incorrect password');
    }

    return user;
};

module.exports = mongoose.model('User', userSchema);
