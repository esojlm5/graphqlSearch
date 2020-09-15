import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { useDebounce } from "use-debounce";

import {
  GET_COUNTRY,
  GET_CITY,
  GET_JOBS,
  GET_LOCATIONS,
} from "../graphql/queries";

import JobsTable from "../ListResults";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const InputSearch = () => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [valueBounce] = useDebounce(text, 300);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(false);
  const [runJobs, { data: dataJobs, loading: loadingJobs }] = useLazyQuery(
    GET_JOBS
  );

  const [
    getCountry,
    { data: dataCountry, loading: loadingCountry },
  ] = useLazyQuery(GET_COUNTRY, { onError: (e) => setError(e) });

  const [
    getCity,
    { data: dataCity, loading: loadingCity },
  ] = useLazyQuery(GET_CITY, { onError: (e) => setError(e) });

  const [
    getLocation,
    { data: LocationData, loading: loadingLocations },
  ] = useLazyQuery(GET_LOCATIONS, {
    onCompleted: (c) => setError(!c.locations.length),
  });

  useEffect(() => {
    runJobs();
  }, [runJobs]);

  useEffect(() => {
    if (dataJobs?.jobs && valueBounce === "") {
      setError(false);
      setResult(dataJobs.jobs);
    }
  }, [dataJobs, valueBounce]);

  useEffect(() => {
    getLocation({
      variables: {
        l: { value: valueBounce },
      },
    });
  }, [valueBounce]);

  useEffect(() => {
    if (LocationData?.locations.length) {
      const { type, slug } = LocationData.locations[0];
      if (type === "city") {
        getCity({
          variables: {
            q: { slug: slug },
          },
        });
      } else {
        getCountry({
          variables: {
            q: { slug: slug },
          },
        });
      }
    }
  }, [LocationData]);

  useEffect(() => {
    if (dataCity?.city?.jobs) {
      setResult(dataCity.city.jobs);
    }
    if (dataCountry?.country?.jobs) {
      setResult(dataCountry.country.jobs);
      console.log(dataCountry?.country?.jobs);
    }
  }, [dataCity, dataCountry]);

  return (
    <div>
      <form noValidate autoComplete="off">
        <TextField
          className={classes.root}
          id="standard-basic"
          label="Search Jobs"
          onChange={(e) => {
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
        loading={
          loadingJobs || loadingCountry || loadingCity || loadingLocations
        }
        error={error}
      />
    </div>
  );
};

export default InputSearch;
