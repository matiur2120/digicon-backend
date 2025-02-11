const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(v){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
            },
            message: 'Please enter a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        set: (v)=> bcrypt.hashSync(v, bcrypt.genSaltSync(10))
    },
    profilePic: {
        type: String
    },
    role: {
        type: String,
        default: 'general'
    }
},{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
