import React, { useState } from 'react'
import contact from '../assets/contact.png'
import axios from 'axios';
import { Toast } from '@radix-ui/react-toast';
import toast from 'react-hot-toast';

const Contact = ({ darkMode }) => {
    const users = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    };

    const [user, setUser] = useState(users);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // console.log(name , value);  

        setUser({ // update the user state with the new value for the changed input field
            ...user,
            [name]: value
        })
    }

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8000/api/user",user);

            toast.success(res.data.message);
            setUser(users);

        }
        catch (err) {
            console.error("Error sending user data:", err);

            if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error("Something went wrong!");
            }
        }
    }

    return (
        <>
            <section id='contact'
                style={{
                    backgroundColor: darkMode ? '#111827' : '#f9fafb'
                }}
                className='py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden'
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
                    <div className="text-center mb-8 sm:mb-10 md:mb-12" data-aos="fade-up">
                        <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3' style={{
                            color: darkMode ? 'white' : "#1f2937"
                        }}>Get In <span style={{
                            background: 'linear-gradient(to right , #f97316 , #f59e0b)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent'
                        }}>Touch</span></h2>
                        <p className='text-base sm:text-lg md:text-xl' style={{
                            color: darkMode ? '#d1d5db' : '#6b7280'
                        }}>Let's discuss your project </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center">
                        <div className="flex justify-center order-2 lg:order-1 " data-aos='fade-right'>
                            <img src={contact} alt="Contact" className='  w-full max-w-xs sm:max-w-sm lg:max-w-md h-[400px]  object-contain' />
                        </div>
                        <form onSubmit={submitForm} style={{
                            background: darkMode ? 'linear-gradient(to right , #1f2937 , #111827)' : 'linear-gradient(to right , #ffffff , #f9fafb)',
                            borderColor: darkMode ? '#374151' : '#e537eb'
                        }} className='rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 border shadow-lg order-1 lg:order-2' data-aos="fade-left">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                                {/* First name */}
                                <input type="text"
                                    id='firstName'
                                    name='firstName'
                                    value={user.firstName}
                                    onChange={handleChange}
                                    placeholder='First Name' style={{
                                        backgroundColor: darkMode ? '#374151' : '#faede3',
                                        borderColor: darkMode ? '#4b5563' : '#d1d5db',
                                        color: darkMode ? 'white' : '#1f2937'
                                    }}
                                    className='w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base focus:border-orange-500 focus-ring-2 focus:ring-orange-500/20 transition-all' required />
                                {/* Last name */}
                                <input type="text"
                                    id='lastName'
                                    name='lastName'
                                    value={user.lastName}
                                    onChange={handleChange}
                                    placeholder='Last Name' style={{
                                        backgroundColor: darkMode ? '#374151' : '#faede3',
                                        borderColor: darkMode ? '#4b5563' : '#d1d5db',
                                        color: darkMode ? 'white' : '#1f2937'
                                    }}
                                    className='w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base focus:border-orange-500 focus-ring-2 focus:ring-orange-500/20 transition-all' required />
                            </div>
                            {/* email address */}
                            <input type="email" id='email' name='email' value={user.email} onChange={handleChange} placeholder='Email Address' style={{
                                backgroundColor: darkMode ? '#374151' : '#faede3',
                                borderColor: darkMode ? '#4b5563' : '#d1d5db',
                                color: darkMode ? 'white' : '#1f2937'
                            }}
                                className='w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base focus:border-orange-500 focus-ring-2 focus:ring-orange-500/20 transition-all mb-3 sm:mb-4' required />
                            {/* Phone number */}
                            <input type="tel" id='phone' name='phone' value={user.phone} onChange={handleChange} placeholder='Phone Number' style={{
                                backgroundColor: darkMode ? '#374151' : '#faede3',
                                borderColor: darkMode ? '#4b5563' : '#d1d5db',
                                color: darkMode ? 'white' : '#1f2937'
                            }}
                                className='w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base focus:border-orange-500 focus-ring-2 focus:ring-orange-500/20 transition-all mb-3 sm:mb-4' required />
                            {/* message */}
                            <textarea type="text" id='message' name='message' value={user.message} onChange={handleChange} placeholder='Your Message' rows='4' style={{
                                backgroundColor: darkMode ? '#374151' : '#faede3',
                                borderColor: darkMode ? '#4b5563' : '#d1d5db',
                                color: darkMode ? 'white' : '#1f2937'
                            }}
                                className='w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base focus:border-orange-500 focus-ring-2 focus:ring-orange-500/20 transition-all mb-3 sm:mb-6 resize-none' required />

                            <button type='submit' style={{
                                background: 'linear-gradient(to right , #f97316 , #f59e0b)',
                                color: 'white',
                                borderColor: 'transparent'
                            }} className='w-full py-2 sm:py-3 rounded-lg text-white text-sm sm:text-base font-semibold hover:shadow-lg hover:shadow-orange-500/25 hover:scale-[1.02] transition-all'>Send Message</button>


                        </form>
                    </div>
                </div>

            </section>
        </>
    )
}

export default Contact