import { singleUpload } from "../middleware/multer.js";
import { AddProject, DeleteProject, GetAllProjects, GetSingleProject, UpdateProject } from "../controller/projectController.js";
import express from "express";

const projectRoute = express.Router();

projectRoute.post('/add-project', singleUpload, AddProject)
projectRoute.get('/get-projects', GetAllProjects)
projectRoute.get('/get-projects/:id', GetSingleProject)
projectRoute.put('/update-project/:id', singleUpload, UpdateProject)
projectRoute.delete('/delete-project/:id', singleUpload, DeleteProject)


export default projectRoute;