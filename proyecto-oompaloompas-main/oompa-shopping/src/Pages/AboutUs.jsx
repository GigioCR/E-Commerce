import { useState } from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
    return (
        <>
            <body>
                <div className='flex flex-col justify-center items-center mb-30'>
                    <div className='w-2/4'>
                        <h1 className="text-xl font-bold text-black md:text-xl text-start pt-20">About Us</h1>
                        <hr className='border-black pb-4 border-t-3'/>
                            <p className='mr-auto ml- pb-8'>We're an online shop based in the ECCI of the University of Costa Rica. We focus primarily on selling
                                tech products like laptops, tablets, and phones. Still, we also sell the most popular viedogames of the moment.
                                I kind of ran out of things to say here so im going to speak latin from now on: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                            </p>
                    </div>
                </div>
            </body>
        </>
    );
}

export default AboutUs;