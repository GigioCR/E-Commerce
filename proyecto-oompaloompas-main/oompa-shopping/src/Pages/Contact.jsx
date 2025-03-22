import React from 'react';
import { CircleCheckIcon, Circle } from 'lucide-react';

const Contact = () => {
    return (
        <div className="Container mx-auto px-4 pt-10 min-h-screen mt-32">
            <div className="Container2 max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="Title text-black text-4xl font-semibold font-['Public Sans'] leading-10 mb-10 text-center">Contact Information</div>
                    <div className="flex flex-wrap -mx-4">
                        <div className="FirstNameGroup w-full sm:w-1/2 px-4 mb-6">
                            <div className="FirstName text-[#8d8d8d] text-xs font-medium font-['Public Sans'] leading-tight">First Name</div>
                            <div className="Input mt-2">
                                <input type="text" className="w-full h-[40px] border border-[#8d8d8d] rounded-md px-3" />
                            </div>
                        </div>
                        <div className="LastNameGroup w-full sm:w-1/2 px-4 mb-6">
                            <div className="LastName text-[#8d8d8d] text-xs font-medium font-['Public Sans'] leading-tight">Last Name</div>
                            <div className="Input mt-2">
                                <input type="text" className="w-full h-[40px] border border-[#8d8d8d] rounded-md px-3" />
                            </div>
                        </div>
                        <div className="EmailGroup w-full sm:w-1/2 px-4 mb-6">
                            <div className="Email text-[#8d8d8d] text-xs font-medium font-['Public Sans'] leading-tight">Email</div>
                            <div className="Input mt-2">
                                <input type="email" className="w-full h-[40px] border border-[#8d8d8d] rounded-md px-3" />
                            </div>
                        </div>
                        <div className="PhoneGroup w-full sm:w-1/2 px-4 mb-6">
                            <div className="PhoneNumber text-[#8d8d8d] text-xs font-medium font-['Public Sans'] leading-tight">Phone Number</div>
                            <div className="mt-2">
                                <input type="tel" className="w-full h-[40px] border border-[#8d8d8d] rounded-md px-3" placeholder="+506 XXXX-XXXX" />
                            </div>
                        </div>
                        <div className="MessageGroup w-full px-4 mb-6">
                            <div className="Message text-[#8d8d8d] text-xs font-medium font-['Public Sans'] leading-tight">Message</div>
                            <textarea className="w-full h-24 border border-[#8d8d8d] rounded-md mt-2 px-3"></textarea>
                        </div>
                        <div className="SubjectGroup w-full px-4 mb-6">
                            <div className="SelectSubject text-black text-base font-semibold font-['Public Sans'] leading-tight mb-4">Select Subject</div>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center">
                                    <CircleCheckIcon size={20} />
                                    <div className="GeneralInquiry ml-2 text-black text-sm font-normal font-['Public Sans'] leading-tight">General Inquiry</div>
                                </div>
                                <div className="flex items-center">
                                    <Circle size={20} />
                                    <div className="GeneralInquiry ml-2 text-black text-sm font-normal font-['Public Sans'] leading-tight">Technical Support</div>
                                </div>
                                <div className="flex items-center">
                                    <Circle size={20} />
                                    <div className="GeneralInquiry ml-2 text-black text-sm font-normal font-['Public Sans'] leading-tight">Feedback</div>
                                </div>
                                <div className="flex items-center">
                                    <Circle size={20} />
                                    <div className="GeneralInquiry ml-2 text-black text-sm font-normal font-['Public Sans'] leading-tight">Others</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4">
                            <button className="w-full bg-[#0d0d0d] text-white text-base font-semibold font-['Public Sans'] leading-snug py-3 rounded-md">
                                Submit your message!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
