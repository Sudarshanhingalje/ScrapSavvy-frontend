const PickupDetailsCard = ({ formData, setFormData }) => {
  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body">
        <h5 className="mb-3">Pickup Details</h5>

        {/* CUSTOMER NAME */}

        <div className="col-md-6 mb-3">
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
          {/* CONTACT */}

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

          {/* DATE */}

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

          {/* TIME */}

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

          {/* ADDRESS */}

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
  );
};

export default PickupDetailsCard;
