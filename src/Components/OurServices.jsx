// OurServices.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { MdMiscellaneousServices } from 'react-icons/md';
import { FiTwitter } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';


const OurServices = () => {
  return (
    <div className="container py-12 mt-12 our-services-bg rounded-lg"> {/* Add the class for the background */}
      {/* Header section */}
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-[#2d5344]">Our Services</h1>
      </div>
      {/* Icons section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mt-12">
        <div className="flex justify-center items-center gap-3">
          <MdMiscellaneousServices className="text-2xl text-[#2d5344]" />
          <p className="text-3xl font-semibold text-[#2d5344]">Services</p>
        </div>
        <div className="flex justify-center items-center gap-3">
          <FiTwitter className="text-3xl text-[#2d5344]" />
          <p className="text-2xl font-semibold text-[#2d5344]">Twitter</p>
        </div>
        <div className="flex justify-center items-center gap-3">
          <FaInstagram className="text-3xl text-[#2d5344]" />
          <p className="text-2xl font-semibold text-[#2d5344]">Instagram</p>
        </div>
        <div className="flex justify-center items-center gap-3">
          <FaPhoneAlt className="text-3xl text-[#2d5344]" />
          <p className="text-2xl font-semibold text-[#2d5344]">Contact</p>
        </div>
      </div>
    </div>
  );
}

export default OurServices;
