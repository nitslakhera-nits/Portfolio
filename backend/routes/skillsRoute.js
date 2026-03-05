import { addSkills, deleteSkills, getSingleSkill, getSkills, updateSkills } from "../controller/skillsController.js";
import { singleUpload } from "../middleware/multer.js";
import express from "express";

const skillsRoute = express.Router();

skillsRoute.post("/add" , singleUpload, addSkills)
skillsRoute.get("/all-skills", getSkills);
skillsRoute.get('/:id', getSingleSkill)
skillsRoute.put("/update/:id", singleUpload, updateSkills);
skillsRoute.delete("/delete/:id",deleteSkills);


export default skillsRoute;