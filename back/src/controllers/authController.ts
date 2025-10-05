import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import {toUserDTO} from "../dto/user.dto";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET n'est pas défini dans .env");

const JWT_EXPIRES = '7d';

export const register: RequestHandler = async (req, res, next) => {
    try {
        const { username, pseudo, email, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) res.status(400).json({ message: 'Email ou username déjà utilisé' });

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({ username, pseudo, email, password: hashedPassword, friends: [] });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({ user });
    } catch (error) {
        next(error);
    }
};

export const login: RequestHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) res.status(404).json({ message: 'Utilisateur non trouvé' });
        // TODO : à remettre
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) res.status(400).json({ message: 'Identifiants invalides' });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
};

export const logout: RequestHandler = async (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0),
    });

    res.status(200).json({ message: 'Déconnecté avec succès' });
};

export const getMe: RequestHandler = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: 'Token manquant' });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
            return;
        }

        res.status(200).json(toUserDTO(user));
    } catch (error) {
        next(error);
    }
};