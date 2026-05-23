import { useDispatch } from "react-redux";

import { assignDeliveryDriver } from "../redux/deliveryThunk";

const useAssignDriver = () => {
  const dispatch = useDispatch();

  const assignDriverHandler = (payload) => {
    dispatch(assignDeliveryDriver(payload));
  };

  return {
    assignDriverHandler,
  };
};

export default useAssignDriver;
