import React from "react";
import { Hidden } from "@material-ui/core";

import { useStyles } from './style';

const ListResultItem = ({ jobs }) => {
  const classes = useStyles();

  return (jobs.map((row, jobIndex) => {
    return (
      <a
        href={row.applyUrl}
        className={classes.containerRef}
        key={jobIndex}
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className={classes.title}>
          <h1>{row.title}</h1>
          <img
            src={
              row.company.logoUrl || `${process.env.PUBLIC_URL}image-logo.png`
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
          <div className={classes.cities}>
            {row.remotes.length === 0 ? row.cities[0].name : "Remote"}
          </div>
        </Hidden>
      </a>
    );
  }));
};

export default ListResultItem;
