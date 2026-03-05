import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Dashboard = () => {
  return (
    <>
        <div className='flex'>
          <Sidebar />
          <div className="flex-1 ml-[250px] ">
            <Outlet />
            
          </div>
        </div>
        
    </>
  )}

export default Dashboard