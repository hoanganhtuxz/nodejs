import User from '../models/user';
// const { errorHandler } = require('../helpers/dbErrorsHandler');
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import formidable from 'formidable';
import dotenv from 'dotenv';
dotenv.config();

export const signup = (req, res) => {

    const user = new User(req.body);
    console.log('thông tin user sau khi mã hóa', user);
    user.save((error, user) => {
        if (error) {
            return res.status(400).json({
                error: "Không thể đăng ký tài khoản"
            })
        }
        user.salt = undefined
        user.hashed_password = undefined
        res.json({ user })
    })
};
export const signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password not match'
            })
        }
        // Tự động tạo ra một mã cùng với user và mã secret
        const token = jwt.sign({ _id: user._id }, 'tudeptrai');
        // persist the token as 't' in cookie with  
        res.cookie('t', token, { expire: new Date() + 9999 });
        // return response with user and token to frontend client
        const { _id, name, email, role } = user;
        return res.json(
            {
                token,
                user: { _id, email, name, role }
            }
        )
    })

}
export const signout = (req, res) => {
    res.clearCookie('t');
    res.json({
        message: 'Signout Success'
    })
};

export const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    secret: 'tudeptrai',
    algorithms: ["HS256"], // added later
    userProperty: "auth",
});

export const isAuth = (req, res, next) => {
    let user = req.user && req.auth && req.user._id == req.auth._id;

    if (!user) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }
    next();
}

export const isAdmin = (req, res, next) => {
    if (req.user.role == 0) {
        return res.status(403).json({
            error: "Admin resource! Access Denined"
        })
    }
    next();
}
export const userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            res.status(400).json({
                error: "Can not find the User"
            })
        }
        req.user = user;
        next();
    })
}