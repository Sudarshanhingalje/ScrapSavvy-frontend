import { useEffect, useState } from "react";
import { MOCK_RATES } from "../constants/scrapTypes";
import { fetchScrapPrices } from "../services/scrapSaleApi";

const useScrapPrices = () => {
  const [rates, setRates] = useState(MOCK_RATES);

  useEffect(() => {
    loadPrices();
  }, []);

  const loadPrices = async () => {
    try {
      const ownerId = 2;

      const data = await fetchScrapPrices(ownerId);

      const map = {};

      data.forEach((item) => {
        map[item.materialType] = item.companyPrice;
      });

      setRates(map);
    } catch (err) {
      console.error("Price fetch error:", err);
    }
  };

  return rates;
};

export default useScrapPrices;
