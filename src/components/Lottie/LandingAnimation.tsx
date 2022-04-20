import React from "react";
import { useLottie, LottieOptions } from "lottie-react";
import landingAnimation from "../../Lottie/landing.json";

type Props = {};

function LandingAnimation({}: Props) {
  const options: LottieOptions = {
    animationData: landingAnimation,
    loop: true,
    autoplay: true,
    height: 50,
    width: 200,
  };

  const { View } = useLottie(options);

  return View;
}

export default LandingAnimation;
