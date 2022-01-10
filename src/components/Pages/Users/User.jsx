import React from "react";
import GroupsTable from "./UserTable";
import "../../../styles/_pagestyles.scss";

function Users() {
  return (
    <section>
      <div className="divMain">
        <div className="divSub">
          <GroupsTable />
        </div>
      </div>
    </section>
  );
}

export default Users;
