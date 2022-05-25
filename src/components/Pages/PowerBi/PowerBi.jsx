import React from "react";
import "../../../styles/_pagestyles.scss";

function Users() {
  //Auto Height
  const tableHeight =
    ((window.innerHeight - 64 - 64 - 52 - 1) / window.innerHeight) * 100;

  //Auto Height
  return (
    <div className="divMain">
      <div className="divSub">
        <iframe
          style={{
            maxWidth: "90%",
            width: "90%",
            height: `${tableHeight}vh`,
            position: "absolute",
            //overflow: "visible",
          }}
          src={process.env.REACT_APP_POWER_BI}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}

export default Users;
