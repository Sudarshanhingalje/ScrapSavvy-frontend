const FormLabel = ({ children, required }) => (
  <div className="pf-label">
    {children}
    {required && <span className="pf-label__req">*</span>}
  </div>
);

export default FormLabel;
