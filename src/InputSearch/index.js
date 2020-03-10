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

const SHOW_COMPANYS = gql`
  query getCompanies {
    companies {
      id
      name
      slug
      jobs {
        ...jobInfo
      }
    }
  }
  ${jobs}
`;
const InputSearch = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState([]);
  const [runJobs, jobs] = useLazyQuery(SHOW_JOBS);

  const [getCountry, country] = useLazyQuery(SHOW_COUNTRY);

  const [getCompanies, company] = useLazyQuery(SHOW_COMPANYS);

  useEffect(() => {
    runJobs();
    getCompanies();
  }, [getCompanies, runJobs]);

  useEffect(() => {
    if (jobs.data) {
      setResult(jobs.data.jobs);
    }
  }, [jobs.data]);

  const classes = useStyles();
  useEffect(() => {
    if (text === "" && jobs.data) {
      setResult(jobs.data.jobs);
    } else {
      getCountry({
        variables: {
          country: { slug: text }
        }
      });
      if (country.data) {
        setResult(country.data.country.jobs);
      }
    }

    if (text !== "" && country.data === undefined) {
      if (company.data) {
        // eslint-disable-next-line array-callback-return
        const companiesFilter = company.data.companies.filter(e => {
          if (e.slug === text) {
            return e.jobs;
          }
        });
        setResult(companiesFilter);
      }
    }
  }, [country.data, text, company.data, jobs.data]);

  return (
    <div>
      <form noValidate autoComplete="off">
        <TextField
          className={classes.root}
          id="standard-basic"
          label="Search Jobs"
          onChange={e => {
            setText(
              e.target.value
                .trim()
                .replace(/\s/g, "-")
                .toLowerCase()
            );
          }}
        />
      </form>

      <JobsTable
        result={result}
        loading={country.loading || jobs.loading}
        error={country.error}
      />
    </div>
  );
};

export default InputSearch;
