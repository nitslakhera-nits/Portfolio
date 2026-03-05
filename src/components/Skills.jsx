// Frontend
import html from '../assets/html.jpg'
import css from '../assets/css.jpg'
import javascript from '../assets/javascript.jpg'
import react_js from '../assets/react.svg'
import bootstrap from '../assets/bootstrap.jpg'
import framer_motion from '../assets/framer_motion.jpg'
import node from '../assets/node.jpg'
import express from '../assets/express.jpg'
import MongoDB from '../assets/mongodb.jpg'
import mysql from '../assets/mysql.jpg'
import mongoose from '../assets/mongoose.jpg'
import { useEffect, useState } from 'react'
import axios from 'axios'


const Skills = ({ darkMode }) => {
    const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get("http://localhost:8000/skills/all-skills")

        setSkills(res.data.data);

      } catch (error) {
        console.error("Error fetching skills data:", error);
        setSkills([]);

      }
    }
    fetchSkills();
  })


    return (
        <>
            <section id='skills'
                style={{
                    backgroundCOlor: darkMode ? '#111827' : '#f9fafb '
                }}
                className='py-14 relative overflow-hidden'>
                <div className="py-14 relative overflow-hidden">
                    <div className="container px-14 py-1 max-auto">
                        <div className="text-center mb-20 " data-aos="fade-up" data-aos-delay="">
                            <h1 className='sm:text-4xl text-3xl font-bold title-font mb-4' style={{
                                color: darkMode ? 'white' : '#1f2937'
                            }}>My                                <span style={{
                                background: 'linear-gradient(to right , #f97316, #f59e0b)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                color: 'transparent'

                            }}>
                                    Skills
                                </span>
                            </h1>
                            <p className='text-lg max-w-2xl leading-relaxed text-center mx-auto' style={{ color: darkMode ? '#d1d5db' : '#4b5553' }}>
                                Turning ideas into dynamic web experiences with React, Node.js, MongoDB, and modern UI technologies.</p>
                        </div>
                        <div className="flex flex-wrap -m-4 " data-aos='fade-up' data-aos-delay='200'>
                            {
                                skills.map((skills, index) => (
                                    <div
                                        key={index}
                                        className="p-4 lg:w-1/4 md:w-1/2 w-full " data-aos="fade-up" data-aos-delay={`${300 + index * 100}`}>
                                        <div
                                            style={{
                                                background: darkMode
                                                    ? 'linear-gradient(to bottom right, #1f2937, #111827)'
                                                    : 'linear-gradient(to bottom right, #ffffff, #f3f4f6)',
                                                borderColor: darkMode ? '#374151' : '#e5e7eb'
                                            }}
                                            className="h-full p-6 rounded-2xl border              hover:border-orange-500/50 transition-all duration-300              hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,165,0,0.15)]   group"
                                        >
                                            <div className="flex items-center ">
                                                <div
                                                    style={{
                                                        background: darkMode
                                                            ? 'linear-gradient(to bottom right, #374151, #1f2937)'
                                                            : 'linear-gradient(to bottom right, #f3f4f6, #e5e7eb)'
                                                    }}
                                                    className="w-16 h-16 rounded-xl p-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                                                >
                                                    <img
                                                        src={skills.image}
                                                        alt={skills.title}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>

                                                <h3
                                                    className="text-2xl font-bold ml-4"
                                                    style={{ color: darkMode ? 'white' : '#1f2937' }}
                                                >
                                                    {skills.title}
                                                </h3>
                                            </div>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default Skills