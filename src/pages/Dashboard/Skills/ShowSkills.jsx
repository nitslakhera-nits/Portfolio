import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get("http://localhost:8000/skills/all-skills")

        setSkills(res.data.data.reverse());

      } catch (error) {
        console.error("Error fetching skills data:", error);
        setSkills([]);

      }
    }
    fetchSkills();
  })

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/skills/delete/${id}`);

      setSkills(skills.filter(skill => skill._id !== id));
      toast.success("Skill deleted successfully");
    }
    catch (error) {
      console.error("Error deleting skill:", error);
      toast.error("Failed to delete skill");
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Skills Details</h1>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Link to="../add-skills">+ Add Skills</Link>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-left">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No Skills Added
                </td>
              </tr>
            ) : (
              skills.map((skill) => (
                <tr key={skill._id} className="border-t">
                  <td className="px-4 py-3">
                    <img
                      src={skill.image}
                      alt={skill.title}
                      className="w-18 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{skill.title}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <Link to={`../update-skills/${skill._id}`}>
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 cursor-pointer"
                      >
                        Edit
                      </button></Link>

                    <Link onClick={() => handleDelete(skill._id)}>
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 cursor-pointer"
                      >
                        Delete
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default Skills;