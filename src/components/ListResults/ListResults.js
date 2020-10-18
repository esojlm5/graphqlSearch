import React  from "react";
import { Box, Hidden } from "@material-ui/core";

import { ListResultItem } from "../../components";
import { useStyles } from "./style";

const ListResults = ({ result, loading, error, global }) => {
  const classes = useStyles();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!result?.length || error) {
    return <h1>No results</h1>;
  }

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

      {result && !global ? (
        result.map((jobs, index) => {
          return <ListResultItem key={index} jobs={jobs.jobs} />;
        })
      ) : (
        <ListResultItem jobs={result} />
      )}
    </div>
  );
};

export default ListResults;
