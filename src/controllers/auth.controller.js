import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { createTokenAcces } from "../libs/jwt.js";

export const register = async (req, res) => {
    //desustructurar el body que se envia
    const {email, password, username} = req.body;

    //console.log(email, password, usrname);
    //res.send("Registrado");

    try {
        const passwordHash = await bcrypt.hash(password,10)
        const newUser = new User({
            username,
            email,
            password: passwordHash 
        });

        const userSaved = await newUser.save();
        const token = await createTokenAcces({ id : userSaved._id});
        res.cookie('token', token)
        res.status(201).json({
            id : userSaved._id,
            username : userSaved.username,
            email : userSaved.email,



        })
        
    } catch (error) {
        res.status(500).json({ message :error.message});
    }
}
export const login = (req, res) => res.send("Login"); 