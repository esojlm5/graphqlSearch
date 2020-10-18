import React, { useState } from "react";

import { RegisterUser } from "../components";
import { SearchContainer } from "../containers";

const Home = () => {
  const [openDialog, setOpenDialog] = useState(true);
  const handleSubmit = e => {
    setOpenDialog(false);
  };
  return (
    <>
      <RegisterUser onSubmit={handleSubmit} open={openDialog} />
      <SearchContainer />
    </>
  );
};

export default Home;
