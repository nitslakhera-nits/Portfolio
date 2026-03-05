import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateSkills = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [skills, setSkills] = useState({
        title: "",
        image: ""
    });

    const [preview, setPreview] = useState("");

    // 🔥 FETCH EXISTING DATA
    useEffect(() => {
        const fetchSingleSkill = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/skills/${id}`);

                setSkills({
                    title: res.data.data.title,
                    image: ""
                });

                setPreview(res.data.data.image);

            } catch (error) {
                console.log(error);
            }
        };

        fetchSingleSkill();
    }, [id]);

    // HANDLE CHANGE
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setSkills({ ...skills, image: files[0] });
            setPreview(URL.createObjectURL(files[0]));
        } else {
            setSkills({ ...skills, [name]: value });
        }
    };

    // 🔥 UPDATE FUNCTION
    const submitSkill = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("title", skills.title);

            if (skills.image) {
                formData.append("image", skills.image);
            }

            const res = await axios.put(
                `http://localhost:8000/skills/update/${id}`,
                formData
            );

            toast.success(res.data.message);
            navigate("/dashboard/skills");

        } catch (error) {
            toast.error("Update failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">

                <h2 className="text-2xl font-bold text-center mb-6">
                    Update Skill
                </h2>

                <form onSubmit={submitSkill} className="space-y-4">

                    <input
                        type="text"
                        name="title"
                        value={skills.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />

                    {preview && (
                        <img
                            src={preview}
                            alt="preview"
                            className="w-full h-30 object-contain rounded mb-3"
                        />
                    )}

                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        accept="image/*"
                        className="w-full border p-2 rounded-lg"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition"
                    >
                        Update
                    </button>

                </form>
            </div>
        </div>
    );
};

export default UpdateSkills;