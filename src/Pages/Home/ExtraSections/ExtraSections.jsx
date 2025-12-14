import React from "react";
import { motion } from "framer-motion";
import { TbCheck, TbMessageCircle, TbPhoneCall } from "react-icons/tb";

const ExtraSections = () => {
  const steps = [
    {
      icon: <TbCheck size={40} className="text-secondary mb-3" />,
      title: "Sign Up",
      description: "Quickly create your AssetVerse account securely.",
    },
    {
      icon: <TbMessageCircle size={40} className="text-secondary mb-3" />,
      title: "Add & Track Assets",
      description: "Add company assets and monitor them in real-time.",
    },
    {
      icon: <TbPhoneCall size={40} className="text-secondary mb-3" />,
      title: "Manage Teams",
      description:
        "Assign assets, approve requests, and manage your team efficiently.",
    },
  ];

  const faqs = [
    {
      question: "Can multiple users track assets?",
      answer:
        "Yes, AssetVerse supports multiple users with role-based permissions.",
    },
    {
      question: "Is data secure?",
      answer:
        "Absolutely! We use industry-standard encryption and secure cloud storage.",
    },
    {
      question: "Can I generate reports?",
      answer:
        "Yes, generate reports for assets, employees, and activity logs anytime.",
    },
  ];

  //   Animation
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 px-6 bg-gray-50">
      {/* How it works */}
      <div className="max-w-6xl mx-auto text-center mb-28">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          How It Works
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-gray-600 mb-16 max-w-2xl mx-auto"
        >
          A simple 3-step process to start managing your assets efficiently.
        </motion.p>

        {/* card Container */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`p-8 rounded-3xl shadow-2xl bg-white transform transition hover:-translate-y-4 hover:shadow-3xl
                          ${i === 1 ? "-mt-8 md:-mt-12" : ""} ${
                i === 2 ? "-mt-2" : ""
              }`}
            >
              <div className="bg-gradient-to-tr from-primary/20 to-secondary/20 p-4 rounded-full w-fit mx-auto mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-6xl mx-auto text-center mb-28">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Frequently Asked Questions
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-gray-600 mb-16 max-w-2xl mx-auto"
        >
          Clear answers to the most common questions about AssetVerse.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl border-l-4 border-primary transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full -translate-x-1/4 -translate-y-1/4"></div>
              <h4 className="font-semibold mb-2 text-secondary z-10 relative">
                {faq.question}
              </h4>
              <p className="text-gray-700 z-10 relative">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="max-w-4xl mx-auto text-center relative py-16 px-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to simplify asset management?
          </h2>
          <p className="text-gray-700 mb-8">
            Join hundreds of companies already using AssetVerse to streamline
            their operations.
          </p>
          <a
            href="/register"
            className="inline-block px-10 py-4 bg-secondary text-white font-semibold rounded-xl shadow hover:opacity-90 transition-all duration-300"
          >
            Get Started
          </a>
        </motion.div>
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full animate-pulse opacity-40"></div>
      </div>
    </section>
  );
};

export default ExtraSections;
