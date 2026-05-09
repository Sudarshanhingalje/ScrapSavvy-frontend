import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CustomerSidebar from "../Common/CustomerSidebar";

const CustomerSells = () => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState([
    {
      materialType: "",
      quantity: "",
      pricePerKg: 0,
      total: 0,
    },
  ]);

  const [formData, setFormData] = useState({
    customerName: "",
    pickupAddress: "",
    contactNo: "",
    pickupDate: "",
    pickupTime: "",
  });

  const [images, setImages] = useState([]);

  // ================= FETCH DAILY RATES =================

  useEffect(() => {
    fetch("http://localhost:8080/api/prices/all?ownerId=2")
      .then((res) => res.json())
      .then((data) => {
        const mapped = {};

        data.forEach((item) => {
          mapped[item.materialType] = item.customerPrice;
        });

        setRates(mapped);
      })
      .catch((err) => console.error(err));
  }, []);

  // ================= HANDLE ITEM CHANGE =================

  const handleItemChange = (index, field, value) => {
    const updated = [...items];

    updated[index][field] = value;

    // Auto fetch price
    if (field === "materialType") {
      updated[index].pricePerKg = rates[value] || 0;
    }

    // Auto total
    const qty = parseFloat(updated[index].quantity || 0);
    const price = parseFloat(updated[index].pricePerKg || 0);

    updated[index].total = qty * price;

    setItems(updated);
  };

  // ================= ADD NEW ITEM =================

  const addItem = () => {
    setItems([
      ...items,
      {
        materialType: "",
        quantity: "",
        pricePerKg: 0,
        total: 0,
      },
    ]);
  };

  // ================= REMOVE ITEM =================

  const removeItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  // ================= TOTAL CALCULATION =================

  const grandTotal = items.reduce(
    (sum, item) => sum + Number(item.total || 0),
    0,
  );

  // ================= IMAGE HANDLE =================

  const handleImages = (e) => {
    setImages([...e.target.files]);
  };

  // ================= SUBMIT ORDER =================

  const submitOrder = async () => {
    try {
      setLoading(true);

      if (images.length === 0) {
        alert("Please upload at least 1 image");
        return;
      }

      // ================= VALIDATION =================

      if (!formData.customerName.trim()) {
        Swal.fire({
          icon: "warning",
          title: "Customer name required",
        });
        return;
      }

      if (!formData.contactNo.match(/^[0-9]{10}$/)) {
        Swal.fire({
          icon: "warning",
          title: "Enter valid 10 digit mobile number",
        });
        return;
      }

      if (!formData.pickupDate) {
        Swal.fire({
          icon: "warning",
          title: "Please select pickup date",
        });
        return;
      }

      if (!formData.pickupTime) {
        Swal.fire({
          icon: "warning",
          title: "Please select pickup time",
        });
        return;
      }

      if (!formData.pickupAddress.trim()) {
        Swal.fire({
          icon: "warning",
          title: "Pickup address required",
        });
        return;
      }

      if (items.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "Add at least 1 scrap item",
        });
        return;
      }

      for (let item of items) {
        if (!item.materialType || !item.quantity) {
          Swal.fire({
            icon: "warning",
            title: "Complete all scrap item fields",
          });
          return;
        }
      }

      if (images.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "Upload at least 1 image",
        });
        return;
      }

      const form = new FormData();

      const orderData = {
        customerName: formData.customerName,
        ownerId: 2,
        customerId: Number(localStorage.getItem("customerId")),
        orderType: "CUSTOMER",
        status: "PENDING",
        pickupAddress: formData.pickupAddress,
        contactNo: formData.contactNo,
        pickupDate: formData.pickupDate,
        pickupTime: formData.pickupTime,
        totalPrice: grandTotal,
        items: items,
      };

      form.append(
        "order",
        new Blob([JSON.stringify(orderData)], {
          type: "application/json",
        }),
      );

      images.forEach((img) => {
        form.append("images", img);
      });

      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:8080/api/customer-sell/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        },
      );

      if (!res.ok) {
        throw new Error("Order failed");
      }

      Swal.fire({
        icon: "success",
        title: "Request Submitted Successfully 🎉",
        text: "Our scrapyard team will contact you soon.",
        confirmButtonColor: "#198754",
      });

      setItems([
        {
          materialType: "",
          quantity: "",
          pricePerKg: 0,
          total: 0,
        },
      ]);

      setImages([]);

      setFormData({
        customerName: "",
        pickupAddress: "",
        contactNo: "",
        pickupDate: "",
        pickupTime: "",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <CustomerSidebar />

      <div className="flex-grow-1 p-4 bg-light min-vh-100">
        <div className="container-fluid">
          <h2 className="mb-2">♻️ Sell Scrap</h2>

          <p className="text-muted">Sell your scrap and earn money</p>

          <hr />

          {/* ITEMS */}

          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <h5 className="mb-3">Scrap Materials</h5>

              {items.map((item, index) => (
                <div key={index} className="row g-3 align-items-end mb-3">
                  <div className="col-md-3">
                    <label className="form-label">Material</label>

                    <select
                      className="form-select"
                      value={item.materialType}
                      onChange={(e) =>
                        handleItemChange(index, "materialType", e.target.value)
                      }
                    >
                      <option value="">Select</option>

                      {Object.keys(rates).map((mat) => (
                        <option key={mat} value={mat}>
                          {mat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-2">
                    <label className="form-label">Quantity (kg)</label>

                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", e.target.value)
                      }
                    />
                  </div>

                  <div className="col-md-2">
                    <label className="form-label">Price/kg</label>

                    <input
                      type="text"
                      className="form-control"
                      value={`₹${item.pricePerKg}`}
                      disabled
                    />
                  </div>

                  <div className="col-md-2">
                    <label className="form-label">Total</label>

                    <input
                      type="text"
                      className="form-control"
                      value={`₹${item.total}`}
                      disabled
                    />
                  </div>

                  <div className="col-md-2">
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <button className="btn btn-success" onClick={addItem}>
                + Add More Material
              </button>
            </div>
          </div>

          {/* PICKUP DETAILS */}

          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <h5 className="mb-3">Pickup Details</h5>
              <div className="col-md-6">
                <label className="form-label">Customer Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Eg. Sudarshan Hingalje"
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customerName: e.target.value,
                    })
                  }
                />
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Contact Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter 10 digit mobile number"
                    maxLength="10"
                    value={formData.contactNo}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contactNo: e.target.value.replace(/\D/g, ""),
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Pickup Date</label>

                  <input
                    type="date"
                    className="form-control"
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.pickupDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pickupDate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Pickup Time</label>

                  <select
                    className="form-select"
                    value={formData.pickupTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pickupTime: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Pickup Time</option>
                    <option value="08:00 AM">08:00 AM</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                  </select>
                </div>

                <div className="col-md-12">
                  <label className="form-label">Pickup Address</label>

                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Eg. A/P Nej, Near Bus Stand, Kolhapur 416110"
                    value={formData.pickupAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pickupAddress: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* IMAGE UPLOAD */}

          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <h5 className="mb-3">Upload Scrap Images</h5>

              <input
                type="file"
                multiple
                accept="image/*"
                className="form-control"
                onChange={handleImages}
              />

              <small className="text-muted">Minimum 1 image required</small>
            </div>
          </div>

          {/* TOTAL */}

          <div className="card shadow-sm border-0">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-0">Total Amount: ₹{grandTotal}</h4>
              </div>

              <button
                className="btn btn-success btn-lg"
                onClick={submitOrder}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Sell Request"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSells;
