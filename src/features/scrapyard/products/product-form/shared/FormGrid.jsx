const FormGrid = ({ cols = 2, children }) => (
  <div className={`pf-grid-${cols}`}>{children}</div>
);

export default FormGrid;
