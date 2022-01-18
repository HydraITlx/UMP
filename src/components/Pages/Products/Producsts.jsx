import React from "react";
import ProductsTable from "./ProductsTable";
import "../../../styles/_pagestyles.scss";

function Users() {
  return (
    <section>
      <div className="divMain">
        <div className="divSub">
          <ProductsTable />
        </div>
      </div>
    </section>
  );
}

export default Users;
