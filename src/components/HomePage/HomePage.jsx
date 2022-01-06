import { observer } from "mobx-react";
import HomeImage from "../../images/Home.jfif";
import UserStore from "../Store/UserStore";

function HomePage() {
  const tableHeight =
    ((window.innerHeight - 64 - 64 - 52 - 1) / window.innerHeight) * 100;

  const options = {
    maxBodyHeight: `${tableHeight}vh`,
    minBodyHeight: `${tableHeight}vh`,
  };

  return (
    <div
      className="App"
      style={{
        backgroupcolor: "rgb(173, 11, 144)",
        height: `${tableHeight}vh`,
        width: `${tableHeight}vh`,
      }}
    >
      <h1
        style={{
          color: "rgb(173, 11, 144)",
          marginBottom: "2%",
          fontWeight: "bold",
          paddingLeft: "10%",
          paddingTop: "5%",
        }}
        className="homepagetext"
      >{`Bem-vindo ${UserStore.username}`}</h1>
      <img
        style={{
          height: "90%",
          paddingLeft: "10%",
          paddingRight: "5%",
          backgroundSize: "cover",
        }}
        src={HomeImage}
        alt="Logo"
      />
    </div>
  );
}
export default observer(HomePage);
