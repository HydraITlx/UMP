import React from "react";
import PharmacistTable from "./PharmacistTable";
import "../../../styles/_pagestyles.scss";

function Users() {
  return (
    <section>
      <div className="divMain">
        <div className="divSub">
          <PharmacistTable />
        </div>
      </div>
    </section>
  );
}

export default Users;
