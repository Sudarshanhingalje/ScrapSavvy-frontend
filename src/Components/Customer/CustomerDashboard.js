import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Static/Dashboard.css";
import CustomerSidebar from "../Common/CustomerSidebar";
import LogoutMenu from "../Common/LogoutMenu";

const CustomerDashboard = () => {
  const navigate = useNavigate();

  // Sample data - in real app, this would come from API
  const [dailyRates, setDailyRates] = useState({
    iron: 45,
    steel: 52,
    copper: 680,
    aluminum: 185,
    brass: 320,
    plastic: 15,
  });

  const [availableItems, setAvailableItems] = useState([
    {
      id: 1,
      item: "Second Hand Motor",
      price: 1500,
      condition: "Good",
      seller: "Sharma Scrapyard",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      inStock: 5,
    },
    {
      id: 2,
      item: "Steel Machine Parts",
      price: 800,
      condition: "Fair",
      seller: "Kumar Metals",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      inStock: 12,
    },
    {
      id: 3,
      item: "Iron Screws (Bulk)",
      price: 200,
      condition: "Good",
      seller: "Patel Scrap Co.",
      image:
        "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop",
      inStock: 50,
    },
    {
      id: 4,
      item: "Steel Dumbbells",
      price: 600,
      condition: "Excellent",
      seller: "Singh Metal Works",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      inStock: 8,
    },
    {
      id: 5,
      item: "Copper Wires",
      price: 300,
      condition: "Good",
      seller: "Gupta Recycling",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      inStock: 25,
    },
    {
      id: 6,
      item: "Aluminum Sheets",
      price: 450,
      condition: "Fair",
      seller: "Shah Scrapyard",
      image:
        "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400&h=300&fit=crop",
      inStock: 15,
    },
  ]);

  const [runningAds] = useState([
    "🔥 Best Rates for Iron Scrap - ₹45/kg Today at Sharma Scrapyard!",
    "⚡ Premium Second Hand Motors - Quality Guaranteed by Kumar Metals!",
    "🛠️ Steel Machine Parts Clearance Sale - Up to 30% Off!",
    "💰 Copper Wire Collection - Premium Rates ₹680/kg - Gupta Recycling",
    "🏋️ Heavy Duty Steel Dumbbells Available - Singh Metal Works",
  ]);

  const [customerStats] = useState({
    itemsViewed: 25,
    itemsPurchased: 8,
    ordersPlaced: 12,
    totalSpent: 8500,
  });

  const [wishlist, setWishlist] = useState([
    { id: 1, item: "Electric Motor (5HP)", maxPrice: 2000 },
    { id: 2, item: "Stainless Steel Screws", maxPrice: 300 },
    { id: 3, item: "Copper Pipes", maxPrice: 500 },
  ]);

  const addToWishlist = (itemId) => {
    console.log("Added to wishlist:", itemId);
    // In real app, this would add to wishlist
    alert("Item added to wishlist!");
  };

  const removeFromWishlist = (itemId) => {
    setWishlist(wishlist.filter((item) => item.id !== itemId));
  };

  const placeOrder = (itemId) => {
    console.log("Placing order for:", itemId);
    // In real app, this would navigate to order page
    alert("Redirecting to order page...");
    // navigate('/place-order');
  };

  return (
    <div className="dashboard-layout">
      <CustomerSidebar />
      <div className="dashboard-main">
        <div className="dashboard-content">
          <div className="logout-menu-container">
            <LogoutMenu />
          </div>

          <div className="dashboard-title">
            <h1>Customer Dashboard</h1>
            <p className="dashboard-subtitle">Scrap Buyer Portal</p>
            <hr />
          </div>

          {/* Running Ads Marquee */}
          <div className="ads-container">
            <div className="ads-marquee">
              <div className="ads-content">{runningAds.join(" • ")}</div>
            </div>
          </div>

          {/* Customer Statistics */}
          <div className="stats-grid">
            <div className="stat-card stat-info">
              <div className="stat-content">
                <h3>{customerStats.itemsViewed}</h3>
                <h5>Items Viewed</h5>
                <small>This month</small>
              </div>
            </div>
            <div className="stat-card stat-success">
              <div className="stat-content">
                <h3>{customerStats.itemsPurchased}</h3>
                <h5>Items Purchased</h5>
                <small>Successfully bought</small>
              </div>
            </div>
            <div className="stat-card stat-warning">
              <div className="stat-content">
                <h3>{customerStats.ordersPlaced}</h3>
                <h5>Orders Placed</h5>
                <small>Total orders</small>
              </div>
            </div>
            <div className="stat-card stat-primary">
              <div className="stat-content">
                <h3>₹{customerStats.totalSpent.toLocaleString()}</h3>
                <h5>Total Spent</h5>
                <small>All time spending</small>
              </div>
            </div>
          </div>

          {/* Daily Scrap Rates */}
          <div className="rates-section">
            <div className="section-card">
              <div className="section-header">
                <h5>Today's Scrap Rates (Per Kg) - Live Updates</h5>
                <small>Rates updated by scrapyard owners</small>
              </div>
              <div className="rates-grid">
                {Object.entries(dailyRates).map(([material, rate]) => (
                  <div key={material} className="rate-item">
                    <div className="rate-card">
                      <h6 className="material-name">
                        {material.charAt(0).toUpperCase() + material.slice(1)}
                      </h6>
                      <h4 className="rate-price">₹{rate}</h4>
                      <small>per kg</small>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rates-info">
                <small>
                  <i className="info-icon">ℹ️</i> Rates are updated daily by
                  scrapyard owners. Contact them directly for bulk purchases.
                </small>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="main-content-grid">
            {/* Available Items */}
            <div className="items-section">
              <div className="section-card">
                <div className="section-header">
                  <h5>Available Second Hand Items</h5>
                  <small>Browse items from various scrapyards</small>
                </div>
                <div className="items-grid">
                  {availableItems.map((item) => (
                    <div key={item.id} className="item-card">
                      <div className="item-image">
                        <img src={item.image} alt={item.item} />
                        <span
                          className={`condition-badge condition-${item.condition.toLowerCase()}`}
                        >
                          {item.condition}
                        </span>
                      </div>
                      <div className="item-details">
                        <h6 className="item-title">{item.item}</h6>
                        <div className="item-info">
                          <div className="item-price">₹{item.price}</div>
                          <div className="item-seller">{item.seller}</div>
                          <div className="item-stock">
                            In Stock: {item.inStock} units
                          </div>
                        </div>
                        <div className="item-actions">
                          <button
                            className="btn btn-outline"
                            onClick={() => addToWishlist(item.id)}
                          >
                            Add to Wishlist
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => placeOrder(item.id)}
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="section-footer">
                  <button className="btn btn-primary">View All Items</button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="sidebar-section">
              {/* Wishlist */}
              <div className="section-card wishlist-card">
                <div className="section-header">
                  <h5>My Wishlist</h5>
                </div>
                <div className="wishlist-items">
                  {wishlist.map((item) => (
                    <div key={item.id} className="wishlist-item">
                      <div className="wishlist-content">
                        <h6>{item.item}</h6>
                        <p>Max Budget: ₹{item.maxPrice}</p>
                        <button
                          className="btn btn-remove"
                          onClick={() => removeFromWishlist(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn btn-info wishlist-manage">
                  Manage Wishlist
                </button>
              </div>

              {/* Quick Actions */}
              <div className="section-card quick-actions-card">
                <div className="section-header">
                  <h5>Quick Actions</h5>
                </div>
                <div className="quick-actions">
                  <button className="btn btn-action btn-primary">
                    Search Items
                  </button>
                  <button className="btn btn-action btn-success">
                    My Orders
                  </button>
                  <button className="btn btn-action btn-warning">
                    Contact Sellers
                  </button>
                  <button className="btn btn-action btn-info">
                    Rate Calculator
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity & Recommendations */}
          <div className="bottom-content-grid">
            <div className="activity-section">
              <div className="section-card">
                <div className="section-header">
                  <h5>Recent Activity</h5>
                </div>
                <div className="activity-list">
                  <div className="activity-item">
                    Purchased Steel Motor from Kumar Metals - ₹1500
                  </div>
                  <div className="activity-item">
                    Added Copper Wires to wishlist
                  </div>
                  <div className="activity-item">
                    Viewed Iron Screws at Patel Scrap Co.
                  </div>
                  <div className="activity-item">
                    Order placed for Steel Dumbbells - ₹600
                  </div>
                  <div className="activity-item">
                    Rate alert: Copper prices increased to ₹680/kg
                  </div>
                </div>
              </div>
            </div>

            <div className="recommendations-section">
              <div className="section-card">
                <div className="section-header">
                  <h5>Recommended for You</h5>
                </div>
                <div className="recommendations-list">
                  <div className="recommendation-item">
                    <div className="recommendation-content">
                      <h6>Industrial Motor (3HP)</h6>
                      <p>Based on your recent purchases</p>
                      <div className="recommendation-footer">
                        <span className="recommendation-price">₹1200</span>
                        <button className="btn btn-outline">View</button>
                      </div>
                    </div>
                  </div>
                  <div className="recommendation-item">
                    <div className="recommendation-content">
                      <h6>Copper Coils (5kg)</h6>
                      <p>High quality recycled copper</p>
                      <div className="recommendation-footer">
                        <span className="recommendation-price">₹3400</span>
                        <button className="btn btn-outline">View</button>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary">
                  View All Recommendations
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
