import Typography from "@mui/material/Typography";

export default function TableTitle(props) {
  const { text } = props;

  const MyNewTitle = ({ text, variant }) => (
    <Typography
      variant={variant}
      style={{
        color: "#ad0b90",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontSize: "1.75rem",
      }}
    >
      {text}
    </Typography>
  );

  return <MyNewTitle variant="h6" text={text} />;
}
