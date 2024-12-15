import { Request, Response } from "express";
import User from "../models/userModel";
import { error } from "console";

//fetch all users
// export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
//     try {
//         console.log("Request received to fetch all users...");
//         const users = await User.find({});  // Fetching all users
//         console.log("Fetched users:", users);

//         res.status(200).json(users);  // Return the users in the response
//     } catch (error) {
//         const err = error as Error;
//         console.error("Error fetching users:", err.message);
//         res.status(500).json({ error: err.message });
//     }
// };



//delete a user
export const deleteUser = async(req: Request, res: Response): Promise<void> =>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            res.status(404).json({error:"User not found"});
            return;
        }
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        const err = error as Error
        res.status(500).json({error: err.message})
    }
}