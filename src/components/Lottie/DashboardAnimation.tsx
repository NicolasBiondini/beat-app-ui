import { useLottie, LottieOptions } from "lottie-react";
import dashboardAnimation from "../../Lottie/clock.json";

type Props = {};

function DashboardAnimation({}: Props) {
  const options: LottieOptions = {
    animationData: dashboardAnimation,
    loop: true,
    autoplay: true,
    height: 100,
    width: 200,
  };

  const { View } = useLottie(options);

  return View;
}

export default DashboardAnimation;
