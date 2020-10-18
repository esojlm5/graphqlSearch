import React from "react";
import { useLocation } from "react-router-dom";
import { SearchContainer } from "../containers";

const Result = () => {
  const location = useLocation();
  console.log(location);

  return (
    <div>
      <SearchContainer />
    </div>
  );
};

export default Result;
