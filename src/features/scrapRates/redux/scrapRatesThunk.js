import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchScrapRates } from "../services/scrapRatesService";

export const getScrapRates = createAsyncThunk(
  "scrapRates/getScrapRates",
  async (ownerId = 2) => {
    const data = await fetchScrapRates(ownerId);

    const map = {};

    data.forEach((item) => {
      map[item.materialType] = {
        customerPrice: item.customerPrice,
        companyPrice: item.companyPrice,
      };
    });

    return map;
  },
);
