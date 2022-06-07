import { observer } from "mobx-react";
import HomeImage from "../../images/Home.jfif";
import UserStore from "../Store/UserStore";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function HomePage() {
  const tableHeight =
    ((window.innerHeight - 64 - 64 - 52 - 1) / window.innerHeight) * 140;

  const options = {
    maxBodyHeight: `${tableHeight}vh`,
    minBodyHeight: `${tableHeight}vh`,
  };

  return (
    <div
      className="slider-container"
      style={{
        position: "fixed",
        backgroupcolor: "rgb(173, 11, 144)",
        height: `${tableHeight}vh`,
        width: `${tableHeight}vh`,
        marginLeft: "4vh",
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
      >{`Bem-vinda(o) ${UserStore.username}`}</h1>

      <Carousel
        className="carousel-style"
        autoFocus
        autoPlay
        interval={3000}
        infiniteLoop
        stopOnHover
        swipeable
        showThumbs={false}
      >
        <div className="slider-item-div">
          <img src="https://cdn.ump.pt//files/images/Misericordias/Rede%20farmac%C3%AAuticos%20UMP/rede%20farmaceuticos%20ump%20(12).JPG" />
        </div>
        <div>
          <img src="https://cdn.ump.pt//files/images/Misericordias/Rede%20farmac%C3%AAuticos%20UMP/rede%20farmaceuticos%20ump%20(8).JPG" />
        </div>
        <div className="slider-item-div">
          <img src="https://cdn.ump.pt//files/images/Misericordias/Rede%20farmac%C3%AAuticos%20UMP/rede%20farmaceuticos%20ump%20(9).JPG" />
        </div>
        <div className="slider-item-div">
          <img src="https://cdn.ump.pt//files/images/Misericordias/Rede%20farmac%C3%AAuticos%20UMP/rede%20farmaceuticos%20ump%20(10).JPG" />
        </div>
        <div className="slider-item-div">
          <img src="https://cdn.ump.pt//files/images/Misericordias/Rede%20farmac%C3%AAuticos%20UMP/rede%20farmaceuticos%20ump%20(11).JPG" />
        </div>
      </Carousel>
    </div>
  );
}
export default observer(HomePage);
