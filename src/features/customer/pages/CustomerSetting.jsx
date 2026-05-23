import { Box } from "@mui/material";
import CustomerSidebar from "../../../shared/layout/CustomerSidebar";

const CustomerSetting = () => {
  return (
    <Box className="d-flex">
      <CustomerSidebar />
      <div className="container">
        <div className="dashboard-content">
          <div className="float-end"></div>
          <div className="dashboard-title">
            <h1>Settings</h1>

            <hr />
          </div>
          <div></div>
        </div>
      </div>
    </Box>
  );
};

export default CustomerSetting;
