import React from "react";
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Anderson",
      role: "HR Manager, TechCorp",
      avatar: "https://i.pravatar.cc/100?img=12",
      quote:
        "AssetVerse has streamlined our asset management. Highly reliable and easy to use!",
    },
    {
      name: "David Brown",
      role: "CEO, NextGen Ltd.",
      avatar: "https://i.pravatar.cc/100?img=14",
      quote:
        "Now we can track assets in real-time. Transparency and efficiency improved massively.",
    },
    {
      name: "Robert Thompson",
      role: "IT Manager, GlobalTech",
      avatar: "https://i.pravatar.cc/100?img=18",
      quote:
        "AssetVerse improved our asset tracking and reporting. The team can now work more efficiently than ever.",
    },
  ];

  const stats = [
    { value: "120+", label: "Companies Trust Us" },
    { value: "2000+", label: "Assets Managed" },
    { value: "99.9%", label: "System Reliability" },
  ];

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

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          What Our Clients Say
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-gray-600 mb-16 max-w-2xl mx-auto"
        >
          Trusted by companies worldwide. Real feedback from professionals who
          rely on AssetVerse.
        </motion.p>

        {/* Testimonials */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="p-8 rounded-3xl bg-white shadow-md border-t-4 border-secondary cursor-pointer 
                         hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-25 h-25 rounded-full border-4 border-primary shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-secondary rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <p className="italic text-gray-700 mb-4">"{t.quote}"</p>
                <h4 className="text-lg font-semibold text-gray-900">
                  {t.name}
                </h4>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="py-8 lg:pt-24"
            >
              <h3 className="text-3xl lg:text-5xl font-bold mb-2 text-secondary">
                {s.value}
              </h3>
              <p className="text-gray-700 text-xl">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
