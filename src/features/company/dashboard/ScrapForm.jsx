import { SCRAP_TYPES } from "../constants/scrapTypes";

const ScrapForm = ({
  form = {},
  errors = {},
  handleChange = () => {},
  selectType = () => {},
}) => {
  return (
    <div className="ss-form-col">
      <div className="ss-card">
        <div className="ss-card-header">
          <h2>Company information</h2>
          <p>Your contact details for the pickup</p>
        </div>

        <div className="ss-card-body">
          <div className="ss-field">
            <label>Company name</label>

            <input
              type="text"
              name="companyName"
              value={form?.companyName || ""}
              placeholder="e.g. Ramesh Patil"
              onChange={handleChange}
              className={errors?.companyName ? "ss-input-error" : ""}
            />

            {errors?.companyName && (
              <p className="ss-field-error">{errors.companyName}</p>
            )}
          </div>

          <div className="ss-field">
            <label>Contact number</label>

            <input
              type="tel"
              name="contactNo"
              value={form?.contactNo || ""}
              placeholder="e.g. 9876543210"
              onChange={handleChange}
            />
          </div>

          <div className="ss-field">
            <label>Pickup address</label>

            <textarea
              name="pickupAddress"
              value={form?.pickupAddress || ""}
              placeholder="House No., Street, Area, City, PIN"
              onChange={handleChange}
              rows={3}
              className={errors?.pickupAddress ? "ss-input-error" : ""}
            />

            {errors?.pickupAddress && (
              <p className="ss-field-error">{errors.pickupAddress}</p>
            )}
          </div>
        </div>
      </div>

      <div className="ss-card">
        <div className="ss-card-header">
          <h2>Material details</h2>
          <p>Tell us what scrap you want to sell</p>
        </div>

        <div className="ss-card-body">
          <div className="ss-field">
            <label>Scrap type</label>

            <div className="ss-chip-group">
              {SCRAP_TYPES.map((type) => (
                <div
                  key={type}
                  className={`ss-chip ${
                    form?.scrapType === type ? "ss-chip--active" : ""
                  }`}
                  onClick={() => selectType(type)}
                >
                  {type}
                </div>
              ))}
            </div>
          </div>

          <div className="ss-row2">
            <div className="ss-field">
              <label>Quantity (kg)</label>

              <input
                type="number"
                name="quantity"
                value={form?.quantity || ""}
                placeholder="e.g. 50"
                min="1"
                onChange={handleChange}
                className={errors?.quantity ? "ss-input-error" : ""}
              />

              {errors?.quantity && (
                <p className="ss-field-error">{errors.quantity}</p>
              )}
            </div>

            <div className="ss-field">
              <label>Preferred date</label>

              <input
                type="date"
                name="preferredDate"
                value={form?.preferredDate || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrapForm;
