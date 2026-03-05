import { a, text } from 'framer-motion/client'
import instagram from '../assets/instagram.png'
import gitHub from '../assets/gitHub.png'
import linkDin from '../assets/linkDin.png'
import facebook from '../assets/facebook.png'
import CV from '../assets/Nitesh_Lakhera_Resume.pdf'
import { DownloadIcon, Mail } from 'lucide-react'
import nitesh from '../assets/nitesh.png'

const Hero = ({ darkMode }) => {

    const socialIcons = [
        {
            icon: instagram, alt: 'Instagram',link: 'https://www.instagram.com/n.i.t.e.s.h.09?igsh=OHhzMms5dnlrdHJy',
        },
        {
            icon: gitHub, alt: 'GitHub', link: 'https://github.com/nitslakhera-nits',
        },
        {
            icon: linkDin, alt: 'LinkedIn',link: 'https://www.linkedin.com/in/nitesh-lakhera-linkdin',
        },
        {
            icon: facebook, alt: 'Facebook', link: 'https://www.facebook.com/nitesh.lakhera.161',
        },
    ];

    const darkTheme = {
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        buttonSecondary: 'text-white border-2 border-orange-500 hover:bg-orange-600 hover:text-white',
        decorativeCircle: 'bg-orange-500 opacity-10'
    }

    const lightTheme = {
        textPrimary: 'text-gray-900',
        textSecondary: 'text-gray-700',
        buttonSecondary: 'text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white',
        decorativeCircle: 'bg-orange-400 opacity-20'
    };

    const theme = darkMode ? darkTheme : lightTheme;
    return (
        <div className='relative overflow-hidden min-h-screen flex flex-col'>
            <section
                id='home'
                data-aos='fade-up'
                data-aos-delay='250'
                className='body-font z-10'
            >
                <div className="container mx-auto flex px-4 sm:px-8 lg:px-14 py-12 lg:py-32 flex-col lg:flex-row items-center justify-between lg:mt-0 mt-14">
                    <div className="lg-w-1/2 w-full flex flex-col  items-center lg:items-start text-center lg:text-left mb-12 lg:mb-0">
                        <div className="flex justify-center lg:justify-start gap-4 sm:gap-6 mb-6 sm:mb-7 w-full">
                            {
                                socialIcons.map((social, index) => (
                                    <a key={index}  href={social.link}
                                        target='_blank'
                                        data-aos-delay={`${400 + index * 100}`}
                                        className="tranform hover:scale-110 transition-transform duration-300">
                                        <img key={index} src={social.icon} alt={social.alt} className={`w-8 h-8 sm:w-10 sm:h-10 object-contain ${darkMode ? '' : 'filter brightness-75'}`} />
                                    </a>

                                ))
                            }
                        </div>
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 inline-block">
                            <h1
                                className={`title-font text-3xl sm:text-4xl lg:text-5xl mb-4 font-bold ${theme.textPrimary}`}
                                data-aos='fade-up'
                                data-aos-delay='500'
                            >
                                Hi, I'm Nitesh Lakhera
                            </h1>

                            <p
                                className={`mb-6 sm:mb-8 leading-relaxed max-w-md sm:max-w-lg ${theme.textSecondary}`}
                                data-aos='fade-up'
                                data-aos-delay='600'
                            >
                                I am a fresher MERN Stack Developer with hands-on knowledge of MongoDB, Express.js, React.js, and Node.js. I have built basic full-stack projects and am eager to learn, grow, and contribute to a professional development team.
                            </p>
                        </div>

                        {/* Button */}
                        <div className="w-full pt-4 sm:pt-6">
                            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4" data-aos='fade-up' data-aos-delay='700'>
                                <a href={CV} download className='w-full sm:w-auto'>
                                    <button className="w-full sm:w-auto inline-flex items-center justify-center text-white bg-linear-to-r from-orange-500 to-amber-500 border-0 py-3 px-6 sm:px-8 hover:shadow-[0_0_40px_rgb(255,165,0,0.7)]  rounded-full text-base sm:text-lg  font-semibold transition-all duration-300 transform">
                                        <DownloadIcon className='w-4 h-4 sm:h-5 sm:w-5 mr-2' />  Download CV
                                    </button>
                                </a>
                                <a href="#contact" className='w-full sm:w-auto'>
                                    <button className={`w-full sm:w-auto  inline-flex items-center justify-center  border-0 py-3 px-6 sm:px-8 hover:shadow-[0_0_30px_rgb(255,165,0,0.7)]  rounded-full text-base sm:text-lg  font-semibold transition-all duration-300 transform ${theme.buttonSecondary}`}>
                                        <Mail className='w-4 h-4 sm:w-5 h-5 mr-2' />
                                        Contact Me

                                    </button>
                                </a>
                            </div>
                        </div>

                    </div>
                    <div className="lg:w-1/2 w-full max-w-md lg:max-w-lg mt-8 lg:mt-0 flex justify-center" data-aos='fade-left' data-aos-delay='400'>
                        <div className="relative w-4/5 sm:w-3/5 lg:w-full">
                            <div className="relative overflow-hidden rounded-lg shadow-lg">
                                <img src={nitesh} alt="Nitesh Lakhera" className="w-auto h-auto object-cover transform hover:scale-105 transition-transform duration-500" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    )
}

export default Hero