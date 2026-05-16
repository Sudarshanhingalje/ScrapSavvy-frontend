import { useEffect } from "react";

import { useDispatch } from "react-redux";

import {
  setInventory,
  setOrders,
  setPrices,
  setTransactions,
} from "../redux/scrapyardSlice";

import {
  connectSocket,
  disconnectSocket,
} from "../../../services/socketService";

const useDashboardSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    connectSocket((type, data) => {
      switch (type) {
        case "inventory":
          dispatch(setInventory(data));
          break;

        case "transactions":
          dispatch(setTransactions(data));
          break;

        case "orders":
          dispatch(setOrders(data));
          break;

        case "prices":
          const map = {};

          data.forEach((item) => {
            map[item.materialType] = {
              customer: item.customerPrice,
              company: item.companyPrice,
            };
          });

          dispatch(setPrices(map));

          break;

        default:
          break;
      }
    });

    return () => {
      disconnectSocket();
    };
  }, [dispatch]);
};

export default useDashboardSocket;
