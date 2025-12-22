import React from "react";
import { TbShieldCheck, TbTrendingUp, TbClock } from "react-icons/tb";
import { motion } from "framer-motion";

const AboutSection = () => {
  const features = [
    {
      icon: <TbShieldCheck size={32} />,
      title: "Enterprise-Grade Security",
      desc: "Robust protection ensures your asset data stays confidential and tamper-proof.",
    },
    {
      icon: <TbTrendingUp size={32} />,
      title: "Operational Efficiency",
      desc: "Reduce administrative effort through automation and real-time collaboration.",
    },
    {
      icon: <TbClock size={32} />,
      title: "Instant Asset Visibility",
      desc: "Track asset movement across teams with live status and smart monitoring.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        {/* Left side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
            Built for Modern Teams to Manage
            <span className="text-secondary"> Assets Smarter</span>
          </h2>

          <p className="text-gray-600 text-lg mb-10">
            AssetVerse streamlines asset distribution, tracking and compliance—
            giving HR and employees a seamless, transparent and efficient
            digital workflow.
          </p>

          <button className="px-7 py-3 bg-secondary text-white rounded-full shadow hover:bg-secondary/90 transition">
            Discover How It Works
          </button>
        </motion.div>

        {/* Right side  */}
        <div className="flex flex-col gap-6">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              className="
                group rounded-2xl border border-gray-200 bg-gray-50 
                p-6 shadow-sm hover:shadow-xl hover:bg-primary/60
                transition-all duration-500 cursor-pointer
                flex items-start gap-4
              "
            >
              <div className="text-secondary">{item.icon}</div>

              <div>
                <h3 className="text-lg font-semibold mb-1 group-hover:text-secondary transition">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
