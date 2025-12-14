import React from "react";
import Lottie from "react-lottie";
import loadingAnimation from "../../assets/json/loading.json";

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-base-100">
      <div className="w-32 md:w-48 lg:w-56">
        <Lottie
          options={defaultOptions}
          height="100%"
          width="100%"
          isClickToPauseDisabled
        />
      </div>
    </div>
  );
};

export default Loading;
