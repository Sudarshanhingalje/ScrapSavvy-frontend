import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../config/env";
const useCustomerSell = () => {
  const [rates, setRates] = useState({});

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/prices/all?ownerId=2`)
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

  return rates;
};

export default useCustomerSell;
