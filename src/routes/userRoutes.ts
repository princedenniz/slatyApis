import express from 'express';
import { addUser, getUser, deleteUser, getAllUsers } from "../controllers/userController";

const router = express.Router();

router.post('/signup', addUser);
router.get("/users", getAllUsers)
router.get('/:id', getUser);
router.delete('/:id', deleteUser);

export default router;
