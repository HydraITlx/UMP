import React from "react";
import UserTable from "./UserTable";
import "../../../styles/_pagestyles.scss";

function Users() {
  return (
    <section>
      <div className="divMain">
        <div className="divSub">
          <UserTable />
        </div>
      </div>
    </section>
  );
}

export default Users;
