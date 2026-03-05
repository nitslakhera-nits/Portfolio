import { Code, Folder, LayoutDashboard, PackagePlus, PackageSearch, Users } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaRegEdit } from "react-icons/fa";

const Sidebar = () => {
  return (
    <>
      <div className="hidden fixed md:block border-r border-gray-600 bg-black w-[250px] p-8 space-y-2 h-screen">

        <div className="text-center pt-10 px-3 space-y-2 text-white">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `text-xl ${isActive ? "bg-orange-500 text-white" : "text-white hover:bg-gray-800"} 
              flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
            }
          >
            <LayoutDashboard />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="skills"
            className={({ isActive }) =>
              `text-xl ${isActive ? "bg-gray-600 text-white" : "text-white hover:bg-gray-800"} 
              flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
            }
          >
           <Code />
            <span>My Skills</span>
          </NavLink>

          <NavLink
            to="users"
            className={({ isActive }) =>
              `text-xl ${isActive ? "bg-gray-600 text-white" : "text-white hover:bg-gray-800"} 
              flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
            }
          >
            <Users />
            <span>Users</span>
          </NavLink>

          <NavLink
            to="projects"
            className={({ isActive }) =>
              `text-xl ${isActive ? "bg-gray-600 text-white" : "text-white hover:bg-gray-800"} 
              flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
            }
          >
           <Folder />
            <span>Projects</span>
          </NavLink>



        </div>
      </div>
    </>
  )
}

export default Sidebar