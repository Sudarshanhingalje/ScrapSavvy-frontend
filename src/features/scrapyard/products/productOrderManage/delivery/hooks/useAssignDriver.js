import { useDispatch } from "react-redux";
import { assignDeliveryDriver } from "../redux/deliveryThunk";

const useAssignDriver = () => {
  const dispatch = useDispatch();

  const assignDriverHandler = ({ id, driverData }) => {
    return dispatch(assignDeliveryDriver({ id, driverData }));
  };

  return { assignDriverHandler };
};

export default useAssignDriver;
