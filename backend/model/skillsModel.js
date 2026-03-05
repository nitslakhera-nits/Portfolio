import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: { //Image upload to cloudinary
        type: String,        
        default: "",
    },
    imagePublicId: { //Public ID for the image in cloudinary to manage the image (delete/update)
        type: String,
        default: "",
    }
}, {timestamps: true});

export default mongoose.model('Skills', skillsSchema);