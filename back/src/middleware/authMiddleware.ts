// import { RequestHandler } from 'express';
// import jwt from 'jsonwebtoken';
// import User, { IUser } from '../models/User';
//
// if (!process.env.JWT_SECRET) {
//     throw new Error("JWT_SECRET n'est pas défini dans .env");
// }
//
// const JWT_SECRET = process.env.JWT_SECRET;
//
// declare global {
//     namespace Express {
//         interface Request {
//             user?: IUser;
//         }
//     }
// }
//
// export const protect: RequestHandler = async (req, res, next) => {
//     let token: string | undefined;
//
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         token = req.headers.authorization.split(' ')[1];
//     }
//
//     if (!token) {
//         res.status(401).json({ message: 'Non autorisé, token manquant' });
//     }
//
//     try {
//         if(token) {
//             const decoded = jwt.verify(token, JWT_SECRET);
//
//
//             // Vérification du type décodé
//             if (typeof decoded === 'string' || !('id' in decoded)) {
//                 res.status(401).json({message: 'Token invalide'});
//             }
//
//             req.user = await User.findById(decoded.id).select('-password');
//
//             if (!req.user) {
//                 res.status(404).json({message: 'Utilisateur non trouvé'});
//             }
//             next();
//         }
//     } catch (error) {
//         res.status(401).json({ message: 'Non autorisé, token invalide' });
//     }
// };
