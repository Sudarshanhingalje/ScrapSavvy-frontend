import { useEffect, useState } from "react";
import "../.././Static/Dashboard.css";
import CompanySidebar from "../Common/CompanySidebar";
import LogoutMenu from "../Common/LogoutMenu";

const CompanyDashboard = () => {
  const [prices, setPrices] = useState({});

  // 🔥 FETCH LIVE RATES
  useEffect(() => {
    fetch("http://localhost:8080/api/prices/all")
      .then((res) => res.json())
      .then((data) => {
        const map = {};
        data.forEach((item) => {
          map[item.category] = item.price;
        });
        setPrices(map);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="d-flex">
      <CompanySidebar />

      <div className="container">
        <div className="dashboard-content">
          <div className="float-end">
            <LogoutMenu />
          </div>

          <h1 className="dashboard-title">Dashboard - Company</h1>

          {/* ═══════════ STATS CARDS ═══════════ */}
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card bg-light text-dark">
                <div className="card-body">
                  <h5>Quantity available</h5>
                  <p className="text-success">Live Inventory</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card bg-light text-dark">
                <div className="card-body">
                  <h5>Quantity sold</h5>
                  <p className="text-primary">Updated Daily</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card bg-light text-dark">
                <div className="card-body">
                  <h5>Orders received</h5>
                  <p className="text-warning">Active Orders</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card bg-light text-dark">
                <div className="card-body">
                  <h5>Payment received</h5>
                  <p className="text-success">₹ Live Tracking</p>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════ LIVE SCRAP RATES ═══════════ */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card bg-white text-dark">
                <div className="card-body">
                  <h3 className="mb-3">📊 Live Scrap Rates (₹/kg)</h3>

                  <div className="row">
                    <div className="col-md-3 mb-2">
                      🔩 Metal: <b>₹{prices.Metal || "--"}</b>
                    </div>

                    <div className="col-md-3 mb-2">
                      🧴 Plastic: <b>₹{prices.Plastic || "--"}</b>
                    </div>

                    <div className="col-md-3 mb-2">
                      📄 Paper: <b>₹{prices.Paper || "--"}</b>
                    </div>

                    <div className="col-md-3 mb-2">
                      🪟 Glass: <b>₹{prices.Glass || "--"}</b>
                    </div>

                    <div className="col-md-3 mb-2">
                      💻 Electronics: <b>₹{prices.Electronics || "--"}</b>
                    </div>

                    <div className="col-md-3 mb-2">
                      👕 Textiles: <b>₹{prices.Textiles || "--"}</b>
                    </div>

                    <div className="col-md-3 mb-2">
                      ♻️ Others: <b>₹{prices.Others || "--"}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════ PLACEHOLDER WIDGETS ═══════════ */}
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="card bg-light text-dark">
                <div className="card-body">Large Widget</div>
              </div>
            </div>

            <div className="col-lg-6 mb-4">
              <div className="card bg-light text-dark">
                <div className="card-body">Large Widget</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
