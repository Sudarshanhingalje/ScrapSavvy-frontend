import ScrapyardSidebar from "../../../shared/layout/ScrapyardSidebar";
import UpdatePriceForm from "../dashboard/UpdatePriceForm";

const UpdatePricesPage = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ScrapyardSidebar />
      <div id="page-content-wrapper">
        <div className="container-fluid p-4">
          <UpdatePriceForm />
        </div>
      </div>
    </div>
  );
};

export default UpdatePricesPage;
