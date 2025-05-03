import {Schema , model} from 'mongoose'
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        minlength: [3, 'username shall be of lenght 3 min'],
        required: true
    },
    email: {
        type: String,
        unique: true,
        minlength: [10 , 'email not valid'],
        match: [/.+@.+\..+/, 'Please enter a valid email'],
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        minlength: [8, 'password should be of minimum lenght 8'],
        required:  true,
        select: false
    },
    roles: {
        type: [String], // for multi role user 
        enum : ['admin' , 'teacher' , 'student'],
        default: 'student',
        required: true
    }
} , {timestamps: true})

userSchema.pre('save' , async function(next) {

    if(!this.isModified('password')) return next() 
    try{

        const saltRounds = 12;
        this.password = await bcrypt.hash(this.password , saltRounds);
        next();

    } catch (err) {
        next(err);
    }
})

userSchema.methods.comparePasswords = function (userPassword) {
    return bcrypt.compare(userPassword , this.password);
}

export const User = model('User' , userSchema);

