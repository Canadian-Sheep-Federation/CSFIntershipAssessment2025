import React from "react";
import { useNavigate } from "react-router-dom";
const SearchComponent = () => {
  const [search, setSearch] = React.useState("");
  const navigate = useNavigate();

  return (
    <div>
      <input
        type="text"
        placeholder="Search for an actor/actress"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate(`/search?search=${search}`);
          }
        }}
      />
    </div>
  );
};

export default SearchComponent;
