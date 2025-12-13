import React from "react";
import {
  TbBox,
  TbUsers,
  TbChartLine,
  TbBell,
  TbClock,
  TbShieldCheck,
} from "react-icons/tb";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  const features = [
    {
      icon: <TbBox size={45} />,
      title: "Smart Asset Tracking",
      description:
        "Monitor assets with real-time visibility and automated logs.",
      type: "gradient-card",
    },
    {
      icon: <TbUsers size={45} />,
      title: "Employee Management",
      description: "Assign assets, roles, and permissions with full control.",
      type: "minimal-card",
    },
    {
      icon: <TbChartLine size={45} />,
      title: "Analytics & Insights",
      description:
        "Beautiful dashboards that show asset performance instantly.",
      type: "border-card",
    },
    {
      icon: <TbBell size={45} />,
      title: "Smart Notifications",
      description: "Get alerts for requests, approvals, returns and deadlines.",
      type: "glass-card",
    },
    {
      icon: <TbClock size={45} />,
      title: "Real-Time Sync",
      description: "All updates sync live across employees and HR teams.",
      type: "shadow-card",
    },
    {
      icon: <TbShieldCheck size={45} />,
      title: "Secure & Protected",
      description: "Industry-standard security ensures safe asset handling.",
      type: "solid-card",
    },
  ];

  // Animation
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Powerful Features for Smart Management
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto mb-14"
        >
          Everything you need to manage assets and teams—intelligently &
          effortlessly.
        </motion.p>

        {/* Feature Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((f, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`
                p-8 rounded-2xl transition duration-500 cursor-pointer
                ${
                  f.type === "gradient-card" &&
                  "bg-gradient-to-br from-secondary/10 to-primary/10 hover:shadow-xl"
                }
                ${
                  f.type === "minimal-card" &&
                  "bg-white hover:shadow-2xl border border-gray-200"
                }
                ${
                  f.type === "border-card" &&
                  "border-l-4 border-secondary bg-white shadow-md hover:shadow-xl"
                }
                ${
                  f.type === "glass-card" &&
                  "backdrop-blur-md bg-white/50 shadow-lg hover:scale-105"
                }
                ${
                  f.type === "shadow-card" &&
                  "bg-white shadow-xl hover:-translate-y-2"
                }
                ${
                  f.type === "solid-card" &&
                  "bg-secondary text-white hover:bg-secondary/90"
                }
              `}
            >
              <div className="flex flex-col items-center text-center">
                {/* icon */}
                <div
                  className={`mb-4 ${
                    f.type === "solid-card" ? "text-white" : "text-secondary"
                  }`}
                >
                  {f.icon}
                </div>

                {/* title */}
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    f.type === "solid-card" && "text-white"
                  }`}
                >
                  {f.title}
                </h3>

                {/* description */}
                <p
                  className={`${
                    f.type === "solid-card" ? "text-white/90" : "text-gray-600"
                  }`}
                >
                  {f.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
