import { useState } from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
    return (
        <>
            <body>
                <div className='flex flex-col justify-center items-center mb-30'>
                    <div className='w-2/4'>
                        <h1 className="text-xl font-bold text-black md:text-xl text-start pt-20">Terms and Conditions</h1>
                        <hr className='border-black pb-4 border-t-3'/>
                            <p className='mr-auto ml- pb-20'>Welcome to Wonka Tech! These Terms and Conditions govern your use of our website and the purchase of products from Wonka Tech. By accessing our website or placing an order, you agree to be bound by these terms. If you do not agree with any part of these terms, please do not use our website or purchase our products.
                            </p>
                            <ul>
                                <li className='font-bold mb-5' >* You confirm that you are at least 18 years of age or have the consent of a parent or guardian to use the site. You agree to comply with all applicable laws and regulations.</li>
                                <li className='font-bold mb-5'>* We strive to provide accurate product descriptions and images. However, we do not warrant that product descriptions or other content on the website are error-free, complete, or current. We reserve the right to modify or discontinue any product without notice.</li>
                            </ul>
                    </div>
                </div>
            </body>
        </>
    );
}

export default Terms;