export const cstatusClass = (status) => {
  if (status === "active") {
    return "cd-cstatus-badge--active";
  }

  if (status === "expiring") {
    return "cd-cstatus-badge--expiring";
  }

  return "cd-cstatus-badge--expired";
};
