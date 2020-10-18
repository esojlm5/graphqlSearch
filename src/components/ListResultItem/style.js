import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  title: {
    flex: 2,
    display: "flex",
    "& h1": {
      fontSize: "calc(18.2px + 5.2 * ((100vw - 320px) / 1280))",
      paddingRight: "30px",
    },
  },
  tag: {
    display: "flex",
    flexWrap: "wrap",
  },
  image: {
    backgroundColor: '#C8C8C8',
    order: "-1",
    width: "100px",
    height: "100px",
    display: "block",
    marginRight: "20px",
    maxWidth: "30%",
    flexShrink: "0",
  },
  tags: {
    padding: "10px",
    margin: "0 5px",
    borderRadius: "4px",
    border: "2px solid rgb(0, 85, 255)",
    fontSize: ".75rem",
    display: "flex",
    alignItems: "center",
    color: "rgb(0, 85, 255)",
    width: "20%",
    justifyContent: "center",
    "&:nth-child(4)": {
      marginTop: "10px",
    },
  },
  containerRef: {
    padding: "30px 20px",
    textDecoration: "none",
    display: "flex",
    color: "#000",
    justifyContent: "space-between",
    alignItems: "flex-start",
    boxShadow: "none",
    borderRadius: "0px",
    transition: "all .25s ease",
    "&:hover": {
      boxShadow: "1px 2px 10px rgba(0,0,0,0.5)",
      borderRadius: "4px",
    },
  },
  country: {
    flex: 1,
    textAlign: "left",
  },
});
