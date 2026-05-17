const RadioGroup = ({ options, value, onChange }) => (
  <div className="pf-radio-group">
    {options.map((opt) => (
      <div
        key={opt.value}
        className={`pf-radio-opt${value === opt.value ? " pf-radio-opt--active" : ""}`}
        onClick={() => onChange(opt.value)}
      >
        {opt.label}
      </div>
    ))}
  </div>
);

export default RadioGroup;
