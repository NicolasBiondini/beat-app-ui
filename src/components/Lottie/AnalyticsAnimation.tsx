import { useLottie, LottieOptions } from "lottie-react";
import robotAnimation from "../../Lottie/robot.json";

type Props = {};

function AnalyticsAnimation({}: Props) {
  const options: LottieOptions = {
    animationData: robotAnimation,
    loop: true,
    autoplay: true,
    height: 100,
    width: 200,
  };

  const { View } = useLottie(options);

  return View;
}

export default AnalyticsAnimation;
