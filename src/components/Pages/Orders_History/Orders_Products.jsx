import React from "react";
import "../../../styles/_pagestyles.scss";
import OrderList from "./OrderList";

function Users() {
  return (
    <section>
      <div className="divMain">
        <div className="divSub">
          <OrderList />
        </div>
      </div>
    </section>
  );
}

export default Users;
