import express from "express"
import { deleteUser} from "../controllers/adminController";


const router = express.Router();

// router.get("/users", getAllUsers);
// console.log("testing route")
router.get("/users/:id", deleteUser);

export default router;