
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ShowProjects = () => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {

        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:8000/projects/get-projects');
                setProjects(response.data.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setProjects([]);
            }
        }
        fetchProjects();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/projects/delete-project/${id}`);

            setProjects(projects.filter(project => project._id !== id));
            toast.success("Project deleted successfully");
        }
        catch (error) {
            console.error("Error deleting project:", error);
            toast.error("Failed to delete project");
        }
    }

    return (
        <div className="p-[9px] bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Projects Details</h1>

                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <Link to="../add-projects">+ Add Projects</Link>
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full  text-left ">
                    <thead className="bg-gray-200 text-center text-gray-900 ">
                        <tr>
                            <th className="px-4 py-3">Image</th>
                            <th className="px-4 py-3">Title</th>
                            <th className="px-4 py-3">Description</th>
                            <th className="px-4 py-3">Languages</th>
                            <th className="px-4 py-3">Link</th>
                            <th className="px-4 py-3 text-center" colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    No Projects Added
                                </td>
                            </tr>
                        ) : (
                            projects.map((project) => (
                                <tr key={project._id} className="border-t">
                                    <td className="px-2 py-1  border border-gray-300">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-18 h-16 object-cover rounded-md"
                                        />
                                    </td>
                                    <td className="px-4 py-3 font-medium  border border-gray-300">{project.title}</td>
                                    <td className="px-4 py-3 w-1/2 text-justify  border border-gray-300">{project.desc}</td>
                                    <td className="px-4 py-3 border border-gray-300">
                                        {project.languages.join(", ")}
                                    </td>
                                    <td className="px-3 py-3 border border-gray-300 max-w-xs">
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline block truncate"
                                            title={project.link}
                                        >
                                            {project.link}
                                        </a>
                                    </td>
                                    <td className="px-4 py-3 text-center space-x-2  border border-gray-300">
                                        <Link to={`../update-projects/${project._id}`}>
                                            <button
                                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600  border border-gray-300 cursor-pointer"
                                            >
                                                Edit
                                            </button></Link>
                                    </td>
                                    <td className="px-4 py-3 text-center space-x-2 border border-gray-300">

                                        <Link onClick={() => handleDelete(project._id)}>
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

export default ShowProjects;