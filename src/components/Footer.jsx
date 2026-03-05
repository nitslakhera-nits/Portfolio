import React from 'react'
import { FaGithub, FaGithubAlt, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = ({ darkMode }) => {
    const currentYear = new Date().getFullYear();

    return (
        <><footer className='border-t' style={{
            background: darkMode ? 'linear-gradient(to bottom , #000000 , #111827)' : 'linear-gradient(to bottom , #f3f4f6 , #e5e7eb)',
            color: darkMode ? 'white' : '#1f2937',
            borderColor: darkMode ? '#374151' : '#d1d5db'
        }}>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col  md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-2 text-orange-500 dark:text-white" >Portfolio</h3>
                    </div>
                    <p
                        className="text-sm" style={{
                            color: darkMode ? '#9ca3af' : '#6b7280'
                        }}
                    >© {currentYear} My Portfolio. All rights reserved. </p>




                    <div className="flex gap-4">
                        <a href="#" className=" w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all hover:bg-linear-to-r hover:from-orange-500 hover:to-amber-500 hover:text-white bg-[#374151] dark:bg-[#f3f4f6] text-white dark:text-black"><FaGithub /></a>
                        <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all hover:bg-linear-to-r hover:from-orange-500 hover:to-amber-500 hover:text-white bg-[#374151] dark:bg-[#f3f4f6] text-white dark:text-black"><FaInstagram /></a>
                        <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all hover:bg-linear-to-r hover:from-orange-500 hover:to-amber-500 hover:text-white bg-[#374151] dark:bg-[#f3f4f6] text-white dark:text-black"> <FaLinkedinIn /></a>
                    </div>

                </div>

            </div>
            {/* <p>© {currentYear} My Portfolio. All rights reserved.</p> */}
        </footer></>

    )
}

export default Footer