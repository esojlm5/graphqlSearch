import React, { useState } from "react";

import { RegisterUser } from "../components";
import { SearchContainer } from "../containers";

import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../graphql/cache";

const Home = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const handleSubmit = e => {
    isLoggedInVar(true);
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
  };

  return (
    <>
      <RegisterUser onSubmit={handleSubmit} open={!isLoggedIn} />
      {isLoggedIn && <SearchContainer />}
    </>
  );
};

export default Home;
