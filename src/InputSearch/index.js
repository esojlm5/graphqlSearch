import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import TextField from "@material-ui/core/TextField";

import JobsTable from "../ListResults";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%"
  }
});

const jobs = gql`
  fragment jobInfo on Job {
    company {
      logoUrl
      name
    }
    tags {
      name
    }
    title
    isFeatured
    isPublished
    createdAt
    remotes {
      name
    }
    applyUrl
    slug
    cities {
      name
      country {
        name
      }
    }
    remotes {
      name
    }
  }
`;
const SHOW_COUNTRY = gql`
  query getCountry($country: LocationInput!) {
    country(input: $country) {
      id
      name
      jobs {
        ...jobInfo
      }
    }
  }
  ${jobs}
`;

const SHOW_JOBS = gql`
  query getJobs {
    jobs {
      ...jobInfo
    }
  }
  ${jobs}
`;

const InputSearch = () => {
  const [dataJobs, setDataJobs] = useState([]);
  const [text, setText] = useState("");
  const [result, setResult] = useState([]);
  const [runJobs, { loading: loadingJobs }] = useLazyQuery(
    SHOW_JOBS,
    {
      onCompleted: data => {
        if (data.jobs.length) {
          setDataJobs(data.jobs);
          setResult(data.jobs);
        }
      }
    }
  );

  const [getCountry, { loading, error, data }] = useLazyQuery(SHOW_COUNTRY);
  useEffect(() => {
    runJobs();
  }, [runJobs]);

  const classes = useStyles();
  useEffect(() => {
    if (text === "") {
      setResult(dataJobs);
    } else {
      setResult(data);
    }
  }, [dataJobs, data, text]);

  return (
    <div>
      <form noValidate autoComplete="off">
        <TextField
          className={classes.root}
          id="standard-basic"
          label="Search Jobs"
          onChange={e => {
            setText(e.target.value);
            if (e.target.value.length >= 3) {
              getCountry({
                variables: {
                  country: { slug: e.target.value.trim().replace(/\s/g, "-") }
                }
              });
            }
          }}
        />
      </form>

      <JobsTable
        result={result}
        loading={loading || loadingJobs}
        error={error}
      />
    </div>
  );
};

export default InputSearch;
