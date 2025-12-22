import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { PropagateLoader } from "react-spinners";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PackagesSection = () => {
  const axiosSecure = useAxiosSecure();

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages");
      return res.data;
    },
  });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <PropagateLoader color="#05047e" />
      </div>
    );
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Choose Your Package
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-gray-600 mb-16 max-w-2xl mx-auto"
        >
          Pick a subscription that fits your company’s needs and scale your
          asset management effortlessly.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="relative p-8 rounded-t-4xl rounded-b-2xl bg-white shadow-sm border-t-10 border-amber-600/80 cursor-pointer 
                         hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold mb-4 text-indigo-600 text-left">
                {pkg.name}
              </h3>
              <p className="text-gray-700 mb-4 font-medium text-left">
                Employee Limit: {pkg.employeeLimit}
              </p>
              <p className="text-gray-900 mb-6 font-extrabold text-2xl text-left">
                ${pkg.price}/month
              </p>
              <ul className="text-gray-600 mb-4 space-y-2 text-left">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="mr-3 text-amber-500 font-bold">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PackagesSection;
