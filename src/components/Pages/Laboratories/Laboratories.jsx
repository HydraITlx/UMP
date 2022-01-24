import React from "react";
import LaboratoriesTable from "./LaboratoriesTable";
import "../../../styles/_pagestyles.scss";

function Users() {
  return (
    <section>
      <div className="divMain">
        <div className="divSub">
          <LaboratoriesTable />
        </div>
      </div>
    </section>
  );
}

export default Users;
