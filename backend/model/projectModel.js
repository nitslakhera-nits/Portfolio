import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    languages: {
        type: [String],
        required: true
    },
    link:{
        type: String,
        default: "",
        required: true
    },
    image:{
        type: String,
        default: "",
    },
    imagePublicId:{
        type: String,
        default: "",
    },
   

}, {timestamps: true});

export default mongoose.model('Projects', projectSchema);