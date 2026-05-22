import { useDispatch, useSelector } from "react-redux";

import {
  getAllOrdersThunk,
  getOrderByIdThunk,
  updateOrderStatusThunk,
} from "../redux/scrapyardOrdersThunks";

const useOrders = () => {
  const dispatch = useDispatch();

  const { orders, selectedOrder, loading, error } = useSelector(
    (state) => state.scrapyardOrders,
  );

  const fetchOrders = () => {
    dispatch(getAllOrdersThunk());
  };

  const fetchOrderById = (orderId) => {
    dispatch(getOrderByIdThunk(orderId));
  };

  const updateStatus = (orderId, status) => {
    dispatch(updateOrderStatusThunk({ orderId, status }));
  };

  return {
    orders,
    selectedOrder,
    loading,
    error,
    fetchOrders,
    fetchOrderById,
    updateStatus,
  };
};

export default useOrders;
