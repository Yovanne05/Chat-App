import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET n'est pas défini dans .env");
}

const JWT_EXPIRES = '7d';

interface AuthResponse {
    user: IUser;
    token: string;
}

interface ErrorResponse {
    message: string;
}

export const register: RequestHandler = async (req, res, next) => {
    try {
        const { username, pseudo, email, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            res.status(400).json({ message: 'Email ou username déjà utilisé' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            username,
            pseudo,
            email,
            password: hashedPassword,
            friends: []
        });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
        res.status(201).json({ user, token });
    } catch (error) {
        next(error);
    }
};

export const login: RequestHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // const isMatch = await bcrypt.compare(password, user.password);
        //         // if (!isMatch) {
        //         //     res.status(400).json({ message: 'Identifiants invalides' });
        //         // }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
        res.status(200).json({ user, token });
    } catch (error) {
        next(error);
    }
};

export const getMe: RequestHandler = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Token manquant ou invalide' });
        }
        if(authHeader) {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

            const user = await User.findById(decoded.id).select('-password');
            if (!user) {
                res.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            res.status(200).json(user);
        }
    } catch (error) {
        next(error);
    }
};
