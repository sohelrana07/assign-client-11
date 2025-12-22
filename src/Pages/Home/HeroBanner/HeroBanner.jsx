import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const HeroBanner = () => {
  return (
    <section className="bg-base-100 min-h-screen flex items-center">
      <div className="container mx-auto px-4 lg:px-10 flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-snug">
            Manage Your Assets{" "}
            <span className="text-secondary">Effortlessly</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-6">
            AssetVerse helps companies track, assign, and manage all their
            assets from a single dashboard. Keep everything organized and
            streamline your workflow.
          </p>

          {/* Buttons */}
          <div className="flex justify-center lg:justify-start gap-4">
            <Link
              to="/auth/register"
              className="btn btn-primary border-none shadow-none  font-bold"
            >
              Get Started
            </Link>

            <Link to="/about" className="btn btn-outline btn-secondary">
              Learn More
            </Link>
          </div>
        </motion.div>

        {/* image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1"
        >
          <img
            src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Corporate Asset Management"
            className="w-full max-w-lg mx-auto rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
