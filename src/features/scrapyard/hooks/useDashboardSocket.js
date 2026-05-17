import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  socketUpdateInventory,
  socketUpdateOrders,
  socketUpdateTransactions,
} from "../redux/scrapyardSlice";

import { socketUpdatePrices } from "../../scrapRates/redux/scrapRatesSlice";

import {
  connectSocket,
  disconnectSocket,
} from "../../../shared/services/SocketService";

const useDashboardSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    connectSocket((type, data) => {
      switch (type) {
        case "prices": {
          const map = {};

          data.forEach((item) => {
            map[item.materialType] = {
              customerPrice: item.customerPrice,
              companyPrice: item.companyPrice,
            };
          });

          dispatch(socketUpdatePrices(map));
          break;
        }

        case "orders":
          dispatch(socketUpdateOrders(data || []));
          break;

        case "inventory":
          dispatch(socketUpdateInventory(data || []));
          break;

        case "transactions":
          dispatch(socketUpdateTransactions(data || []));
          break;
      }
    });

    return () => disconnectSocket();
  }, [dispatch]);
};

export default useDashboardSocket;
