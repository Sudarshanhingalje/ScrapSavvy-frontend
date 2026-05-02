import "../../Static/SplashScreen.css";

const SplashScreen = () => {
  return (
    <div className="splash-container">
      <img src="/scrapsavvy-logo.svg" alt="Logo" className="splash-logo" />
      <div className="splash-loader">
        <div className="splash-loader-fill" />
      </div>
      <span className="splash-loader-text">Loading...</span>
    </div>
  );
};

export default SplashScreen;
