import ForbiddenImage from "../../images/noaccess.png";

export default function ForbPage() {
  const ImageSize =
    ((window.innerHeight - 64 - 64 - 52 - 1) / window.innerHeight) * 70;

  return (
    <div
      style={{
        backgroupcolor: "rgb(173, 11, 144)",
        height: `${ImageSize}vh`,
        width: `${ImageSize}vh`,
      }}
    >
      <h1
        style={{
          color: "rgb(173, 11, 144)",
          marginBottom: "5%",
          fontWeight: "bold",
          paddingLeft: "10%",
          paddingTop: "5%",
          whiteSpace: "nowrap",
        }}
      >
        {
          "Não tem permissões para aceder a esta página, por favor consultar com um administrador"
        }
      </h1>
      <img
        style={{
          height: `${ImageSize}vh`,
          paddingLeft: "35%",
          paddingRight: "5%",
          backgroundSize: "cover",
        }}
        src={ForbiddenImage}
        alt="ForbiddenImageCaption"
      />
    </div>
  );
}
