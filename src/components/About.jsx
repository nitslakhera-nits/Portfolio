import React from 'react'
import nitesh from '../assets/nitesh.png';

const About = ({ darkMode }) => {
    return (
        <>
            <section
                id="about"
                className={`relative w-full min-h-screen flex items-center justify-center  px-4 sm:px-4 ${darkMode ? "bg-black" : "bg-gray-100"
                    }`}
            >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-yellow-400/20 blur-3xl"></div>

                <div className="relative w-full max-w-5xl text-center">

                    {/* Heading */}
                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-10 
                 bg-gradient-to-r from-yellow-400 to-orange-500 
                 bg-clip-text text-transparent drop-shadow-lg"
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
                        About Me
                    </h1>

                    {/* Glass Card */}
                    <div className="backdrop-blur-xl bg-white/10 border border-white/20 
                    rounded-3xl p-8 sm:p-12 shadow-2xl"  data-aos="fade-left"
                        data-aos-delay="400">

                        <p
                            className={`text-base sm:text-lg md:text-xl leading-relaxed ${darkMode ? "text-gray-200" : "text-gray-800 border-orange-300"} `}
                        >

                            I am a passionate MERN Stack Developer with a strong interest in
                            building modern, scalable, and high-performance web applications.
                            I specialize in both frontend and backend development using
                            MongoDB, Express.js, React.js, and Node.js.

                            <br /><br />

                            As a fresher, I focus on writing clean code, creating smooth UI
                            experiences, and building full-stack projects that solve real-world
                            problems.

                            <br /><br />

                            I am continuously learning new technologies and improving my
                            development skills to grow as a professional developer.
                        </p>

                    </div>
                </div>
            </section>

        </>
    )
}

export default About