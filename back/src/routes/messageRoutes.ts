import express from 'express';
import { createMessage, getAllMessages, deleteAllMessages } from '../controllers/messageController';

const router = express.Router();

router.post('/', createMessage);
router.get('/', getAllMessages);
router.delete('/', deleteAllMessages);

export default router;
