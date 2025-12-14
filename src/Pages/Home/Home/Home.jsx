import React from "react";
import HeroBanner from "../HeroBanner/HeroBanner";
import AboutSection from "../AboutSection/AboutSection";
import FeaturesSection from "../FeaturesSection/FeaturesSection";
import Testimonials from "../Testimonials/Testimonials";
import ExtraSections from "../ExtraSections/ExtraSections";

const Home = () => {
  return (
    <div>
      <title>Assign Verse | Home </title>
      <HeroBanner></HeroBanner>
      <AboutSection></AboutSection>
      {/* 1 ta dynamic baki ache */}
      <FeaturesSection></FeaturesSection>
      <Testimonials></Testimonials>
      <ExtraSections></ExtraSections>
    </div>
  );
};

export default Home;
