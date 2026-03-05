import Project from "../model/projectModel.js";
import cloudinary from "../utils/cloudinary.js";


export const AddProject = async (req, res) => {
    try {
        const { title, desc, languages, link } = req.body;

        let image = "";
        let imagePublicId = "";

        // Check if an image file is uploaded
        if (req.file) {
            const uploadprojectImg = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "projects" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(req.file.buffer); //
            });

            image = uploadprojectImg.secure_url;
            imagePublicId = uploadprojectImg.public_id;

        }

        // Parse languages if it's a string (comma-separated)
        const parsedLanguages = typeof languages === "string" ? languages.split(",").map(lang => lang.trim()) : languages;

        //create a new project document
        const newProject = new Project({
            title,
            desc,
            languages: parsedLanguages,
            link,
            image,
            imagePublicId,
        });

        await newProject.save();

        return res.status(201).json({
            message: "Project Added Successfully",
            success: true,
            data: newProject,
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
}

export const GetAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Projects Fetched Successfully",
            success: true,
            data: projects,
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
}

export const GetSingleProject = async (req, res) => {
    try {
        const id = req.params.id;
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ message: "Project not found", success: false });
        }

        return res.status(200).json({
            message: "Project Fetched Successfully",
            success: true,
            data: project,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
}

export const UpdateProject = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, desc, languages, link } = req.body;

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ message: "Project not found", success: false });
        }

        if (req.file) {
            // Delete the old image from Cloudinary if it exists
            if (project.imagePublicId) {
                await cloudinary.uploader.destroy(project.imagePublicId);
            }

            // Upload the new image to Cloudinary
            uploadNewProjectImg = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "projects" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(req.file.buffer);
            }
            );
            project.image = uploadNewProjectImg.secure_url;
            project.imagePublicId = uploadNewProjectImg.public_id;
        }

        // Update other fields
        project.title = title || project.title;
        project.desc = desc || project.desc;
        project.languages = languages ? (typeof languages === "string" ? languages.split(",").map(lang => lang.trim()) : languages) : project.languages;
        project.link = link || project.link;

        await project.save();

        return res.status(200).json({
            message: "Project Updated Successfully",
            success: true,
            data: project,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
}

export const DeleteProject = async (req, res) => {
    try {
        const id = req.params.id;
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ message: "Project not found", success: false });
        }

        // Delete the image from Cloudinary if it exists
        if (project.imagePublicId) {
            await cloudinary.uploader.destroy(project.imagePublicId);
        }

        await Project.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Project Deleted Successfully",
            success: true,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
}