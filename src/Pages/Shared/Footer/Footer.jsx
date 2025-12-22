import React from "react";
import { TbHexagonLetterA } from "react-icons/tb";
import {
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaLaptop,
  FaServer,
  FaNetworkWired,
} from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-12 pb-6">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & About */}
        <div className="flex flex-col gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <TbHexagonLetterA size={45} className="text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-wide">
              Asset<span className="text-secondary">Verse</span>
            </h2>
          </Link>
          <p className="text-gray-400 text-sm">
            AssetVerse helps companies manage and track their assets
            efficiently. From laptops to servers, everything under one roof.
          </p>
          <div className="flex gap-4 text-xl mt-2">
            <FaLaptop className="hover:text-primary transition-colors" />
            <FaServer className="hover:text-primary transition-colors" />
            <FaNetworkWired className="hover:text-primary transition-colors" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>
          <Link to="/auth/login" className="hover:text-primary transition">
            Login
          </Link>
          <Link to="/auth/register" className="hover:text-primary transition">
            Register
          </Link>
          <Link
            to="/employee/my-assets"
            className="hover:text-primary transition"
          >
            My Assets
          </Link>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg">Contact Us</h3>
          <p>Email: support@assetverse.com</p>
          <p>Phone: +880 1234 567890</p>
          <div className="flex gap-4 mt-2 text-xl">
            <a href="#" className="hover:text-primary transition-colors">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-800 pt-4">
        &copy; {new Date().getFullYear()} AssetVerse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
