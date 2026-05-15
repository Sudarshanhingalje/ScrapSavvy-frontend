import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchLivePrices } from "../services/companyDashboardService";

export const getLivePrices = createAsyncThunk(
  "companyDashboard/getLivePrices",
  async () => {
    const data = await fetchLivePrices();

    const map = {};

    data.forEach((item) => {
      map[item.materialType] = item.companyPrice;
    });

    return map;
  },
);
