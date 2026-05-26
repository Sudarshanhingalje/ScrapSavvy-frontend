import "../styles/aiAssistant.css";

const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "mr", name: "मराठी", flag: "🇮🇳" },
  ];

  return (
    <div className="language-selector">
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`language-btn ${currentLanguage === lang.code ? "active" : ""}`}
          onClick={() => onLanguageChange(lang.code)}
          title={lang.name}
        >
          <span>{lang.flag}</span> {lang.name}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
