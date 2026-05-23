import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliveries, fetchDeliveryById } from "../redux/deliveryThunk";

const useDeliveryTracking = (id) => {
  const dispatch = useDispatch();
  const { selectedDelivery, loading, error } = useSelector(
    (state) => state.delivery,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchDeliveryById(id));
    } else {
      dispatch(fetchDeliveries());
    }
  }, [dispatch, id]);

  return { selectedDelivery, loading, error };
};

export default useDeliveryTracking;
