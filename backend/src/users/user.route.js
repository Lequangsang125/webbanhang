const express = require('express');
const User = require('./user.model');
const generateToken = require('../middleware/generateToken');
const router = express.Router();

// Register endpoint
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body
        const user = new User({ email, username, password });
        await user.save();
        res.status(201).send({ message: "User registered successfully" })
    } catch (error) {
        console.log("error registering user", error)
        res.status(500).send({ message: "error registering user," })

    }
})

//login user endpoint 
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).send({ message: 'User not found' })
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Password not match' })
        }

        const token = await generateToken(user.id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })

        res.status(200).send({
            message: 'Login suscess', token, user: {
                _id: user._id,
                email: user.email,
                username: user.username,
                role: user.role,
                profileImage: user.profileImage,
                bio: user.bio,
                profession: user.profession,
            }
        })
    } catch (error) {
        console.log("error login user", error)
        return res.status(500).send({ message: "error login in user," })

    }
})

//logout endpoint
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    return res.status(200).send({ message: 'Logged out successfully' })
})

//delete a user
router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send({ message: "user not found" })
        }
        return res.status(200).send({ message: "user deleted successfully" })
    } catch (error) {
        console.log("error deleting user", error)
        return res.status(500).send({ message: "error deleting user," })

    }
})

//get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, 'id email role').sort({ createdAt: -1 })
        return res.status(200).send(users)
    } catch (error) {
        console.log("error fetching user", error)
        return res.status(500).send({ message: "error fetching user," })
    }
})

//update user role
router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const user = await User.findByIdAndUpdate(id, { role }, { new: true });
        if (!user) {
            return res.status(404).send({ message: "user not found" })
        }
        return res.status(200).send({ message: "user role updated successfully", user })
    } catch (error) {
        console.log("error update user role", error)
        return res.status(500).send({ message: "error updating user role" })
    }
})

// edit or update profile
router.patch('/edit-profile', async (req, res) => {
    try {
        const { userId, username, profileImage, bio, profession } = req.body;
        if (!userId) {
            return res.status(400).send({ message: "user id is required " })
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).send({ message: "user not found " })
        } 
        //update profile
        if(username !== undefined) user.username = username;
        if(profileImage !== undefined) user.profileImage = profileImage;
        if(bio !== undefined) user.bio = bio;
        if(profession !== undefined) user.profession = profession;

        await user.save();
        res.status(200).send({message: 'profile update successfully', user:{
            _id: user._id,
            email: user.email,
            username: user.username,
            role: user.role,
            profileImage: user.profileImage,
            bio: user.bio,
            profession: user.profession,
        }})

    } catch (error) {
        console.log("error update user profile", error)
        return res.status(500).send({ message: "error updating user profile" })
    }
})

//
module.exports = router;