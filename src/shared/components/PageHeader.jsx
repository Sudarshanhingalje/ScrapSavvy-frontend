const PageHeader = ({ title, subtitle, rightSection }) => {
  return (
    <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>

        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      {rightSection}
    </div>
  );
};

export default PageHeader;
