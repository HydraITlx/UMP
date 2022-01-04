import { observer } from "mobx-react";
import HomeImage from "../../images/Home.jfif";
import UserStore from "../Store/UserStore";

function HomePage() {
  return (
    <div
      className="App"
      style={{
        backgroupcolor: "rgb(173, 11, 144)",
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
