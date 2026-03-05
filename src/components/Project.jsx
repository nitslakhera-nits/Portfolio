import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";

const Project = ({ darkMode }) => {

    const [projects, setProjects] = useState([]);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {

        const fetchProjects = async () => {
            try {
                const response = await axios.get("http://localhost:8000/projects/get-projects");
                setProjects(response.data.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setProjects([]);
            }
        };

        fetchProjects();
    }, []);

    return (
        <section
            id="projects"
            style={{
                backgroundColor: darkMode ? "#111827" : "#f9fafb",
            }}
            className="relative py-24"
        >
            <div className="container mx-auto px-4">

                {/* Heading */}
                <div className="text-center mb-10">
                    <h2
                        className="text-3xl sm:text-4xl font-bold mb-3"
                        style={{ color: darkMode ? "white" : "#1f2937" }}
                    >
                        My{" "}
                        <span
                            style={{
                                background: "linear-gradient(to right, #f97316,#f5930b)",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                color: "transparent",
                            }}
                        >
                            Projects
                        </span>
                    </h2>

                    <p
                        className="max-w-xl mx-auto"
                        style={{ color: darkMode ? "#d1d5db" : "#6b7280" }}
                    >
                        A showcase of my recent work
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">

                    {projects.map((project, index) => {

                        const isExpanded = expandedId === project._id;

                        return (
                            <div
                                key={project._id}
                                style={{
                                    background: darkMode
                                        ? "linear-gradient(to right, #1f2937,#111827)"
                                        : "linear-gradient(to right, #ffffff,#f9fafb)",
                                    borderColor: darkMode ? "#374151" : "#e5e7eb",
                                }}
                                className="group rounded-xl border duration-300 hover:border-orange-500/50 transition-all"
                            >

                                {/* Image */}
                                <div className="h-50 overflow-hidden rounded-t-xl">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-fill group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>

                                <div className="p-4">

                                    {/* Title */}
                                    <h3
                                        className="text-lg font-bold mb-2"
                                        style={{ color: darkMode ? "white" : "#1f2937" }}
                                    >
                                        {project.title}
                                    </h3>

                                    {/* Description */}
                                    <p
                                        className={`text-sm mb-2 ${!isExpanded ? "line-clamp-2" : ""}`}
                                        style={{
                                            color: darkMode ? "#d1d5db" : "#6b7280",
                                        }}
                                    >
                                        {project.desc}
                                    </p>

                                    {/* View More / Less */}
                                    {project.desc.length > 100 && (
                                        <button
                                            onClick={() =>
                                                setExpandedId(isExpanded ? null : project._id)
                                            }
                                            className="text-orange-500 text-sm font-medium mb-3 hover:underline"
                                        >
                                            {isExpanded ? "View Less" : "View More"}
                                        </button>
                                    )}

                                    {/* Languages */}
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {(typeof project.languages === "string"
                                            ? project.languages.replace(/[\[\]"]/g, "").split(",")
                                            : project.languages || []
                                        ).map((tag, i) => (
                                            <span
                                                key={i}
                                                style={{
                                                    backgroundColor: darkMode ? "#374151" : "#f3f4f6",
                                                    color: darkMode ? "#d1d5d6" : "#4b5563",
                                                }}
                                                className="px-2 py-1 text-xs rounded-full"
                                            >
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>

                                    {/* GitHub Button */}
                                    <div className="flex gap-2">
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                backgroundColor: darkMode
                                                    ? "#374151"
                                                    : "#ffaf76",
                                                color: darkMode ? "white" : "#374151",
                                            }}
                                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm rounded-lg hover:opacity-90 transition-colors"
                                        >
                                            <FaGithub className="text-sm" />
                                            <span>Code</span>
                                        </a>
                                    </div>

                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
};

export default Project;