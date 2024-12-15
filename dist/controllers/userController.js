"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUser = exports.getAllUsers = exports.addUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, referredBy } = req.body;
        // Generate referral link
        const referralLink = `${req.protocol}://${req.get("host")}/waitlist?ref=${email}`;
        // Calculate waitlist position
        const waitlistPosition = (yield userModel_1.default.countDocuments()) + 1;
        //check if referredBy email exists
        let referrer;
        if (referredBy) {
            referrer = yield userModel_1.default.findOne({ email: referredBy });
            if (!referrer) {
                res.status(400).json({ error: "Invalid referrer email" });
                return;
            }
        }
        //create the new user
        const newUser = yield userModel_1.default.create({
            name,
            email,
            referralLink,
            referredBy,
            waitlistPosition,
        });
        //update the referrer's referral count
        if (referrer) {
            referrer.referrals = (referrer.referrals || 0) + 1;
            yield referrer.save();
        }
        res.status(201).json(newUser);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: err.message });
    }
});
exports.addUser = addUser;
//fetch all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Request received to fetch all users...");
        const users = yield userModel_1.default.find({}); // Fetching all users
        console.log("Fetched users:", users);
        res.status(200).json(users); // Return the users in the response
    }
    catch (error) {
        const err = error;
        console.error("Error fetching users:", err.message);
        res.status(500).json({ error: err.message });
    }
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findById(req.params.id);
        console.log(user);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json(user);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: err.message });
    }
});
exports.getUser = getUser;
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
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // Get the ID from the request URL
        const deletedUser = yield userModel_1.default.findByIdAndDelete(id); // Find and delete user by ID
        if (!deletedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: err.message });
    }
});
exports.deleteUser = deleteUser;
