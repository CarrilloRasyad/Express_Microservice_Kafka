const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

require("dotenv").config();

const router = express.Router();

const generateToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

router.post(
"/register", 
    async(req, res) => {
    const {username, email, password} = req.body;

    const usernameExists = await db.query("SELECT * FROM users where username = $1", [
        username,
    ]);

    if(!email.includes('@') || !email.includes('.')) {
        return res.status(400).json({ message: "Invalid email format"});
    }

    if(usernameExists.rows.length > 0) {
        return res.status(400).json({ message: "username already exists"});
    }

    const emailExists = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
    ]);

    if(emailExists.rows.length > 0) {
        return res.status(400).json({message: "user already exists"});
    }

    if(password.length < 6) {
        return res.status(400).json({message: "password must be at least 6 character long"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.query("INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *",
        [username, email, hashedPassword]
    );

    return res.status(201).json({ message: "User Created", user: newUser.rows[0] });

});

router.post(
"/login",
    async(req, res) => {
        const {email, password} = req.body;
        const user = await db.query("SELECT * FROM users where email = $1", [
            email
        ]);

        if(user.rows.length === 0) {
            return res.status(404).json({ message: "users not found" });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if(!validPassword) {
            return res.status(400).json({message: "Invalid email and password"});
        }

        const token = generateToken({
            id: user.rows[0].id,
            email: user.rows[0].email,
        });

        return res.status(200).json({message: "Login successfull", token});
        
    }
);

router.get(
"/validate", 
    async(req, res) => {
        const token = req.headers["authorization"];
        if(!token) {
            return res.status(403).json({message: "UnAuthorized"});
        }
        try {
            const tokenData = token.split(" ") [1];
            const user = jwt.verify(tokenData, process.env.JWT_SECRET);
            return res.status(200).json({...user});
        } catch (error) {
            return res.status(403).json({message: "Invalid token"});
        }
    }    
);

module.exports = router;
