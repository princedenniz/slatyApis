import { Request, Response } from "express";
import User from "../models/userModel";

export const addUser = async (req: Request, res: Response) => {
  try {
    const { name, email, referredBy } = req.body;

    // Generate referral link
    const referralLink = `${req.protocol}://${req.get(
      "host"
    )}/waitlist?ref=${email}`;

    // Calculate waitlist position
    const waitlistPosition = (await User.countDocuments()) + 1;

    //check if referredBy email exists
    let referrer;
    if (referredBy) {
      referrer = await User.findOne({ email: referredBy });
      if (!referrer) {
        res.status(400).json({ error: "Invalid referrer email" });
        return;
      }
    }

    //create the new user
    const newUser = await User.create({
      name,
      email,
      referralLink,
      referredBy,
      waitlistPosition,
    });

    //update the referrer's referral count
    if (referrer) {
      referrer.referrals = (referrer.referrals || 0) + 1;
      await referrer.save();
    }

    res.status(201).json(newUser);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};

//fetch all users
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Request received to fetch all users...");
    const users = await User.find({}); // Fetching all users
    console.log("Fetched users:", users);

    res.status(200).json(users); // Return the users in the response
  } catch (error) {
    const err = error as Error;
    console.error("Error fetching users:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};

// export const deleteUser = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);

//     if (!user) {
//       res.status(404).json({ error: "User not found" });
//       return;
//     }

//     res.json({ message: "User deleted successfully" });
//   } catch (error) {
//     const err = error as Error;
//     res.status(500).json({ error: err.message });
//   }
// };


export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
      const { id } = req.params; // Get the ID from the request URL
      const deletedUser = await User.findByIdAndDelete(id); // Find and delete user by ID

      if (!deletedUser) {
          res.status(404).json({ message: "User not found" });
          return;
      }

      res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
  }
};
