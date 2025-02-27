import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler( async (req, res, next) =>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //Get token
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get User from the token and store it in the request body 
            req.user = await User.findById(decoded.id).select('-password')

            next();

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Not Authorized");
        }
    }

    if(!token)
    {
        res.status(401)
        throw new Error("Not Authorised, no token");
    }
});


export default protect;
