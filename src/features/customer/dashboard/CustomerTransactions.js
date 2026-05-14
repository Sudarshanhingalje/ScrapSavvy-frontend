import PaymentsMadeTable from "../../../payment/PaymentsMadeTable";
import LogoutMenu from "../../../shared/components/LogoutMenu";
import CustomerSidebar from "../../../shared/layout/CustomerSidebar";

const CustomerTransactions = () => {
  return (
    <div className="d-flex">
      <CustomerSidebar />
      <div className="container">
        <div className="dashboard-content">
          <div className="float-end">
            <LogoutMenu />
          </div>
          <div className="dashboard-title">
            <h1>Payments</h1>
            <hr />
          </div>
          <div>
            <PaymentsMadeTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTransactions;
