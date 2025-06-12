import React from "react";
import SearchComponent from "../Components/SearchComponent";

import "../styles/index.scss";

const Index = () => {
  return (
    <div className="index">
      <h1>Rate your favourite (and/or least favourite) actors' acting!</h1>
      <div>Powered by the iMDB API!</div>
      <SearchComponent />
    </div>
  );
};

export default Index;
