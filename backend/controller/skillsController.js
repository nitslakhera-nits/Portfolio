import Skills from "../model/skillsModel.js";
import cloudinary from "../utils/cloudinary.js";

export const addSkills = async (req, res) => {
    try {
        const { title } = req.body;

        let image = "";
        let imagePublicId = "";

        // Check if file exists
        if (req.file) {
            const uploadedImage = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "skills" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(req.file.buffer); //
            });

            image = uploadedImage.secure_url;
            imagePublicId = uploadedImage.public_id;
        }

        // Create new skill document
        const newSkills = new Skills({
            title,
            image,
            imagePublicId,
        });

        await newSkills.save();

        return res.status(201).json({
            message: "Skill Added Successfully",
            success: true,
            data: newSkills,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};

export const getSkills = async (req, res) => {
    try {

        const skills = await Skills.find().sort({ createdAt: 1 }); // Fetch all skills sorted by creation date (newest first)

        // Check if skills exist
        if (!skills || skills.length === 0) {
            return res.json({ message: " No Skills Found", success: true, data: [] });
        }

        res.status(200).json({ message: "Skills Fetched Successfully", success: true, data: skills });

    } catch (error) {
        res.status(500).json({ message: error.message, success: false });

    }
}

export const getSingleSkill = async(req,res) =>{
    try {
        const id = req.params.id;
        const skill = await Skills.findById(id);

        if(!skill){
            return res.status(404).json({ message: "Skill not found", success: false });
        }
        res.status(200).json({ message: "Skill Fetched Successfully", success: true, data: skill });

        
    } catch (error) {
                res.status(500).json({ message: error.message, success: false });

    }
}

export const updateSkills = async (req, res) => {
    try {
        const id = req.params.id;
        const { title } = req.body;

        // 1️⃣ Find skill by ID
        const skills = await Skills.findById(id);

        if (!skills) {
            return res.status(404).json({
                message: "Skill not found",
                success: false,
            });
        }

        // If new image uploaded
        if (req.file) {

            // Delete old image
            if (skills.imagePublicId) {
                await cloudinary.uploader.destroy(skills.imagePublicId);
            }

            // Upload new image using buffer
            const uploadResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "skills" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );

                stream.end(req.file.buffer);
            });

            skills.image = uploadResult.secure_url;
            skills.imagePublicId = uploadResult.public_id;
        }

        // 3️⃣ Update title
        skills.title = title || skills.title;

        // 4️⃣ Save to database
        const savedSkills = await skills.save();

        return res.status(200).json({
            message: "Skill Updated Successfully",
            success: true,
            data: savedSkills,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};

export const deleteSkills = async (req,res) =>{
    try {
        const id = req.params.id;

        //find skill by id
        const skill = await Skills.findById(id);

        if(!skill){
            res.status(404).json({ message: "Skill not found", success: false });
        }

        //delete image from cloudinary
        if(skill.imagePublicId){
            await cloudinary.uploader.destroy(skill.imagePublicId);
        }

        //delete skill from database
        await Skills.findByIdAndDelete(id);
        res.status(200).json({ message: "Skill Deleted Successfully", success: true });
        


        
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}
