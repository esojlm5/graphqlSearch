import React from "react";
import { Box, Hidden, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  title: {
    flex: 2,
    display: "flex",
    "& h1": {
      fontSize: "calc(18.2px + 5.2 * ((100vw - 320px) / 1280))",
      paddingRight: "30px"
    }
  },
  tag: {
    display: "flex",
    flex: 2,
    flexWrap: "wrap"
  },
  image: {
    order: "-1",
    width: "100px",
    height: "100px",
    display: "block",
    marginRight: "20px",
    maxWidth: "30%",
    flexShrink: "0"
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
      marginTop: "10px"
    }
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
      borderRadius: "4px"
    }
  },
  country: {
    flex: 1,
    textAlign: "left"
  },
  containerBar: {
    display: "flex",
    padding: "30px 20px"
  }
});

const JobsTable = ({ result, loading, error }) => {
  const classes = useStyles();
  if (loading) {
    return <h1>Loading...</h1>;
  }

  let data = result;

  if (data === undefined || data.length === 0) {
    return <h1>No results</h1>;
  }

  if (data[0].jobs !== undefined) {
    data = data[0].jobs;
  }
  data = data.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div data-test="test-result">
      <div className={classes.containerBar}>
        <Box flex={2} data-test="title">
          Title
        </Box>
        <Hidden smDown>
          <Box flex={2}>Tags</Box>
        </Hidden>
        <Hidden smDown>
          <Box flex={1}>Country</Box>
        </Hidden>
      </div>

      {data.map((row, index) => {
        return (
          <a
            href={row.applyUrl}
            className={classes.containerRef}
            key={index}
            target="_blank"
          >
            <div className={classes.title}>
              <h1>{row.title}</h1>
              <img
                src={
                  row.company.logoUrl ||
                  `${process.env.PUBLIC_URL}image-logo.png`
                }
                alt="logo company"
                className={classes.image}
              />
            </div>
            <Hidden smDown>
              <div className={classes.tag}>
                {/* eslint-disable-next-line array-callback-return */}
                {row.tags.map((tag, index) => {
                  if (index < 4) {
                    return (
                      <div className={classes.tags} key={index}>
                        {tag.name}
                      </div>
                    );
                  }
                })}
              </div>
            </Hidden>
            <Hidden smDown>
              <div className={classes.country}>
                {row.remotes.length === 0
                  ? row.cities[0].country.name
                  : "Remote"}
              </div>
            </Hidden>
          </a>
        );
      })}
    </div>
  );
};

export default JobsTable;
