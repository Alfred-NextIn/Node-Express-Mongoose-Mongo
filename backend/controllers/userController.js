import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';

dotenv.config();
//@route POST /api/users
//@desc create users
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || ! password)
    {
        res.status(400);
        throw new Error("All fields are reqiured");
    }

    //check if user exist
    const userExists = await User.findOne({email});

    if(userExists)
    {
        res.status(400);
        throw new Error("User already exists");
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create User
    const user = await User.create({
        name: name,
        password: hashedPassword,
        email: email
    });

    if(user)
    {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    }else{
        res.status(400)
        throw new Error("User couldn't be created")
    }

});

//@route POST /api/users
//@desc create users
export const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password)
    {
        res.status(400);
        throw new Error("All fields are required");
    }

    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password,user.password)))
    {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    }else{
        res.status(200).json({msg: "Invalid Credentials"});
    }

});

// Generate JWT
export const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

//@route GET /api/users
//@desc create users
export const getUser = asyncHandler( async (req, res) => {
    const { _id, name, email} = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email,
    });
});