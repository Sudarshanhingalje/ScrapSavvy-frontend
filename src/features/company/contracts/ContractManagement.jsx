import { CONTRACTS } from "../constants/contracts";
import { cstatusClass } from "../utils/contractUtils";

const ContractManagement = () => {
  const companyId = Number(localStorage.getItem("companyId")) || 101;

  const filteredContracts = CONTRACTS.filter((c) => c.companyId === companyId);

  return (
    <div className="cd-card">
      <div className="cd-card__body">
        <div className="cd-card__title">📑 Contract Management</div>

        {filteredContracts.map((c) => (
          <div className="cd-con-row" key={c.name}>
            <div>
              <div className="cd-con-name">{c.name}</div>

              <div className="cd-con-meta">
                {c.party} · Ends {c.end}
              </div>
            </div>

            <div className="cd-con-right">
              <div className="cd-con-val">{c.value}</div>

              <span className={`cd-cstatus-badge ${cstatusClass(c.status)}`}>
                {c.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractManagement;
