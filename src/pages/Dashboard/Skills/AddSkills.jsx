import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddSkills = () => {
    const addSkills = {
        title: "",
        image: "",
    }
    const navigate = useNavigate();

    const [skills, setSkills] = useState(addSkills);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setSkills({
                ...skills,
                image: files[0]   // store actual file
            });
        } else {
            setSkills({
                ...skills,
                [name]: value
            });
        }
    };

    const submitSkill = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("title", skills.title);

            if (skills.image) {
                formData.append("image", skills.image);
            }

            const res = await axios.post("http://localhost:8000/skills/add", formData);

            toast.success(res.data.message);

            setSkills({
                title: "",
                image: ""
            });

            navigate("../skills");

        } catch (error) {
            console.error("Error sending skills data:", error);

            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong!");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 ">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 mt-[-200px]">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Add New Skill
                </h2>

                <form onSubmit={submitSkill} encType="multipart/form-data" className="space-y-4">

                    {/* Title Field */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            onChange={handleChange}
                            value={skills.title}
                            placeholder="Enter title"
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

                            className="w-full border p-2 rounded-lg cursor-pointer"
                            required
                        />
                    </div>

                    {/* Image Preview */}
                    {/* {preview && (
            <div className="mt-4">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )} */}

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

export default AddSkills;