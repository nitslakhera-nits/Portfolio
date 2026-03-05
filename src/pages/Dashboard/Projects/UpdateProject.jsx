import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProject = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [project, setProject] = useState({
        title: "",
        desc: "",
        languages: "",
        link: "",
        image: ""
    });

    const [preview, setPreview] = useState("");

    // 🔥 Fetch existing project
    useEffect(() => {

        const fetchSingleProject = async () => {
            try {

                const res = await axios.get(`http://localhost:8000/projects/get-projects/${id}`);

                setProject({
                    title: res.data.data.title,
                    desc: res.data.data.desc,
                    languages: res.data.data.languages.join(", "),
                    link: res.data.data.link,
                    image: ""
                });

                setPreview(res.data.data.image);

            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch project");
            }
        };

        fetchSingleProject();

    }, [id]);



    // 🔥 Handle input change
    const handleChange = (e) => {

        const { name, value, files } = e.target;

        if (name === "image") {
            const file = files[0];

            setProject({ ...project, image: file });

            if (file) {
                setPreview(URL.createObjectURL(file));
            }

        } else {

            setProject({ ...project, [name]: value });

        }
    };


    // 🔥 Submit Update
    const submitProject = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("title", project.title);
            formData.append("desc", project.desc);
            formData.append("languages", project.languages);
            formData.append("link", project.link);

            if (project.image) {
                formData.append("image", project.image);
            }

            const res = await axios.put(
                `http://localhost:8000/projects/update-project/${id}`,
                formData
            );

            toast.success(res.data.message);

            navigate("../projects");

        } catch (error) {

            console.log(error);
            toast.error("Update Failed");

        }
    };


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">

                <h2 className="text-2xl font-bold text-center mb-6">
                    Update Project
                </h2>

                <form
                    onSubmit={submitProject}
                    encType="multipart/form-data"
                    className="space-y-4"
                >

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={project.title}
                            onChange={handleChange}
                            placeholder="Enter title"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>


                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Description
                        </label>

                        <input
                            type="text"
                            name="desc"
                            value={project.desc}
                            onChange={handleChange}
                            placeholder="Enter description"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>


                    {/* Languages */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Languages
                        </label>

                        <input
                            type="text"
                            name="languages"
                            value={project.languages}
                            onChange={handleChange}
                            placeholder="Enter languages (comma separated)"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>


                    {/* Link */}
                    <div>
                        <label className="block text-sm font-medium mb-1 truncate w-full">
                            Project Link
                        </label>

                        <input
                            type="text"
                            name="link"
                            value={project.link}
                            onChange={handleChange}
                            placeholder="Enter project URL"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>


                    {/* Image Preview */}
                    {preview && (
                        <img
                            src={preview}
                            alt="preview"
                            className="w-full h-32 object-contain rounded mb-3"
                        />
                    )}


                    {/* Upload Image */}
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
                        />
                    </div>


                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
                    >
                        Update Project
                    </button>

                </form>

            </div>

        </div>
    );
};

export default UpdateProject;