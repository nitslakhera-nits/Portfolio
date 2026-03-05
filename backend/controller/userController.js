import User from "../model/userModel.js";

// Create a new user
export const addUser  = async(req , res) => {
    try {
        const newUser = new User(req.body);
        

        const saveUser = await newUser.save();
        // res.status(200).json(saveUser); // Send the saved user data as a response
        res.status(200).json({ message : "Submitted" });
        
    } catch (error) {
        res.status(500).json({ message : error.message})
    }
}

// Get all users
export const getAllUsers = async(req,res) =>{
    try {
        const usersData = await User.find();

        if(!usersData || usersData.length === 0){
            return res.status(404).json({message : "No users found"});
        }

        res.status(200).json(usersData);
    } catch (error) {
        res.status(500).json({message :error.message})
    }
}

// Get a user by ID
export const getUserByID = async(req,res) =>{
    try {
        
        const id = req.params.id; 
        const userExist = await User.findById(id);

        if(!userExist){
            return res.status(404).json({message : "User not found"});
        }
        res.status(200).json(userExist);

    } catch (error) {
        res.status(500).json({message :error.message})
    }
}

// Update a user by ID
export const updateUser = async(req,res) =>{
    try {
        const id = req.params.id;
        const userExist =await User.findById(id);

        if(!userExist){
            return res.status(404).json({message: "User not found"});
        }

        const updatedUser = await User.findByIdAndUpdate(id, req.body, { 
            returnDocument: "after" // Return the updated document after the update is applied
        });
        res.status(200).json(updatedUser);
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// Delete a user by ID
export const deleteUser = async(req,res)=>{
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);

        if(!userExist){
            return res.status(404).json({message: "User not found"});
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({message: "User deleted successfully"});
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
