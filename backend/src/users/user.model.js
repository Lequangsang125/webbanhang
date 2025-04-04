const {Schema,model} = require('mongoose');
const bcryptjs = require('bcryptjs');
const userSchema = new Schema({
    username: {type:String, required:true, unique: true},
    email: {type:String, required:true, unique: true},
    password: {type:String, required:true},
    role: {
        type: String, default: 'user'
    },
    profileImage: String,
    bio: {type:String, maxlength: 200},
    profession: String,
    createdAt: {
        type: Date,
        default: Date.now
    }

})

//hash password
userSchema.pre('save', async function (next) {
    const user = this;
    if(!user.isModified('password')) return next();
    const hashedPassword =  await bcryptjs.hash(user.password, 10);
    user.password = hashedPassword;
    next();
})

//math passwords
userSchema.methods.comparePassword = function (cadidatePassword) {
    return bcryptjs.compare(cadidatePassword, this.password)
}

const User = new model('User', userSchema);
module.exports = User;