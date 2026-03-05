import express from "express";
import { addUser,  deleteUser, getAllUsers, getUserByID,  updateUser } from "../controller/userController.js";

const userRoute = express.Router();

userRoute.post('/user' , addUser);
userRoute.get('/users',getAllUsers);
userRoute.get('/user/:id',getUserByID);
userRoute.put('/update/user/:id', updateUser);
userRoute.delete('/delete/user/:id', deleteUser);

export default userRoute;