// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import background5 from '../assets/background5.jpg'; // Adjust the path if necessary

const LoginForm = () => {
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add validation logic here if needed
        navigate('/homepage'); // Redirect to Homepage after login 
    };

    return (
        <div
            className="flex flex-col items-center justify-center h-screen bg-cover bg-no-repeat bg-center w-screen" // Center items and ensure full height
            style={{ backgroundImage: `url(${background5})` }} // Use inline style to enforce full height
        >
            <h1 className="text-3xl font-bold text-[#2d5344] bg-white bg-opacity-20 backdrop-blur-md p-2 rounded-[20px] mt-24">
                Welcome to Bookish Bliss Library!
            </h1>

            <div className="flex-grow flex items-center justify-center"> {/* Center the form vertically */}
                <form 
                    onSubmit={handleSubmit} 
                    className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-[20px] shadow-2xl w-full max-w-sm mb-8"
                >
                    <h1 className="text-2xl font-semibold text-black mb-4 text-center">Login</h1>
                    <div className="flex items-center border-b border-gray-300 py-2 mb-4">
                        <FaUserAlt className="text-black mr-2" />
                        <input
                            type="text"
                            placeholder="Username"
                            required
                            className="appearance-none bg-transparent border-none w-full text-black py-1 px-2 focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center border-b border-gray-300 py-2 mb-4">
                        <FaLock className="text-black mr-2" />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            className="appearance-none bg-transparent border-none w-full text-black py-1 px-2 focus:outline-none" 
                        />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <label className="flex items-center text-sm text-black">
                            <input type="checkbox" className="mr-2" />
                            Remember me
                        </label>
                        <a href="#" className="text-sm text-[#517849] font-bold hover:underline text-text-[#517849]k ml-4">
                            Forgot Password?
                        </a>
                    </div>

                    <button type="submit" className="w-full bg-[#2d5344] hover:bg-[#517849] text-black font-bold py-2 px-4 rounded">
                        Login
                    </button>
                    <div className="text-center mt-4">
                        <p className="text-sm text-black">
                            Don’t have an account? 
                            <a href="#" className="text-[#517849] font-bold hover:underline text-[#2d5344] ml-1">Register</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
