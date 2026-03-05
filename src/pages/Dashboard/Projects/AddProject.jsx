import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
    const addProject = {
        title: "",
        desc: "",
        languages: [],
        link: "",
        image: null
    }
    const naviaget = useNavigate();
    const [project, setProject] = useState(addProject);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setProject({
                ...project,
                image: files[0]   // store actual file
            });
        }
        else if (name === "languages") {
            setProject({
                ...project,
                languages: value.split(",").map(lang => lang.trim()) // split by comma and trim spaces
            });
        }
        else {
            setProject({
                ...project,
                [name]: value
            });
        }
    }

    const submitProject = async (e) => {
        e.preventDefault();
        try {

            const formData = new FormData();
            formData.append("title", project.title);
            formData.append("desc", project.desc);
            formData.append("link", project.link);
            formData.append("languages", project.languages.join(","));
            formData.append("image", project.image); // append the file

            const res = await axios.post("http://localhost:8000/projects/add-project", formData);

            setProject(addProject); // reset form

            toast.success(res.data.message);

            naviaget("../projects");
        } catch (error) {
            toast.error("Failed to add project");
        }
    }


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 ">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 ">
                <h2 className="text-2xl font-bold text-center mb">
                    Add New Project
                </h2>

                <form onSubmit={submitProject} encType="multipart/form-data" className="space-y-4">

                    {/* Title Field */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            onChange={handleChange}
                            value={project.title}

                            placeholder="Enter title"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Description
                        </label>
                        <input
                            type="text"
                            name="desc"
                            onChange={handleChange}
                            value={project.desc}
                            placeholder="Enter description"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Languages
                        </label>
                        <input
                            type="text"
                            name="languages"
                            onChange={handleChange}
                            value={project.languages.join(", ")} // display as comma-separated string
                            placeholder="Enter Project Languages (comma separated)"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Link
                        </label>
                        <input
                            type="text"
                            name="link"
                            onChange={handleChange}
                            value={project.link}
                            placeholder="Enter Project Link/URL"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>


                    {/* Image Upload Field */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}


                            accept="image/*"

                            className="w-full border p-2 rounded-lg cursor-pointer bg-gray-200"
                            required
                        />
                    </div>



                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer transition duration-300"
                    >
                        Submit
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddProject;