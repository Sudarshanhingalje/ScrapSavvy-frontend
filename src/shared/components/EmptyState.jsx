const EmptyState = ({ title, subtitle }) => {
  return (
    <div className="bg-white border rounded-2xl p-10 text-center">
      <h2 className="text-xl font-bold mb-2">{title}</h2>

      <p className="text-gray-500">{subtitle}</p>
    </div>
  );
};

export default EmptyState;
