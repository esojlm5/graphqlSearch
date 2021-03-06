import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";

import {
  GET_REMOTE,
  GET_CITIES,
  GET_JOBS,
  GET_LOCATIONS
} from "../../graphql/queries";

import { InputSearch, ListResults } from "../../components";

const SearchContainer = () => {
  const history = useHistory();
  const location = useLocation();

  const [text, setText] = useState("");
  const [result, setResult] = useState([]);
  const [globalJobs, setGlobalJobs] = useState(false);
  const { loading: loadingCities, errorCities } = useQuery(GET_CITIES, {
    onCompleted: data =>
      result.length === 0 && location.pathname === "/" && setResult(data.cities)
  });

  const [getRemotes, { loading: loadingRemotes, errorRemotes }] = useLazyQuery(GET_REMOTE, {
    onCompleted: data => {
      setGlobalJobs(true);
      setResult(data.remotes[0].jobs);
    }
  });

  const [
    getLocations,
    { data: LocationData, loading: loadingLocations, error: errorLocations }
  ] = useLazyQuery(GET_LOCATIONS);

  const [getJobs, { loading: loadingJobs, errorJobs }] = useLazyQuery(GET_JOBS, {
    onCompleted: data => {
      setGlobalJobs(true);
      setResult(data.jobs);
    }
  });
  const handleChange = e => {
    const { value } = e.target;

    setText(value);
  };

  const handleLink = e => {
    if (e.key === "Enter" || e.keyCode === 13) {
      history.push({ pathname: `/result/${text}`, state: { message: text } });
    }
  };

  useEffect(() => {
    if (location?.pathname !== "/") {
      getLocations({
        variables: {
          l: { value: location?.state?.message }
        }
      });
    }
  }, [location]);

  useEffect(() => {
    if (LocationData?.locations[0]) {
      const { slug, type } = LocationData.locations[0];
      if (type === "remote") {
        getRemotes();
      } else {
        getJobs({ variables: { jobs: { slug: slug, type: type } } });
      }
    }
  }, [LocationData]);

  return (
    <div>
      <InputSearch handleChange={handleChange} handleLink={handleLink} />
      <ListResults
        result={result}
        loading={
          loadingCities || loadingJobs || loadingRemotes || loadingLocations
        }
        error={errorLocations || errorCities || errorRemotes || errorJobs}
        global={globalJobs}
      />
    </div>
  );
};

export default SearchContainer;
