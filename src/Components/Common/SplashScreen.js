import "../../Static/SplashScreen.css";
import logo from "../Assets/images/scrapsavvy-logo.svg";

const SplashScreen = () => {
  return (
    <div className="splash-container">
      <img src={logo} alt="Logo" className="splash-logo" />

      <div className="splash-loader">
        <div className="splash-loader-fill" />
      </div>

      <span className="splash-loader-text">Loading...</span>
    </div>
  );
};

export default SplashScreen;
