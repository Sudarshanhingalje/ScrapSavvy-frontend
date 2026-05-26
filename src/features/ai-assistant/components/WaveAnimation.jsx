import "../styles/aiAssistant.css";

const WaveAnimation = () => {
  return (
    <div className="wave-animation">
      {[1, 2, 3, 4, 5].map((bar) => (
        <div key={bar} className="wave-bar" />
      ))}
    </div>
  );
};

export default WaveAnimation;
