import React, { useState } from "react";

export const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className=" flex flex-row items-center gap-5 justify-between sm:flex ">
      <div>
        <input
          className="bg-[#dcdbed] px-5 py-2 rounded-[5px] w-auto lg:w-[1100px]  border-black"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
        />
      </div>

      <div>
        <button
          className="text-white bg-[#140979] w-auto  cursor-pointer font-medium rounded-[5px] text-sm px-5 py-2.5 shadow hover:bg-[#321ee2] lg:w-[300px]"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};
