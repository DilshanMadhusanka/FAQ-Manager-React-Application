import React from "react";

export const RowsPerPage = ({ rowsPerPage, setRowsPerPage }) => {
  return (
    <div>
      <label>Rows per page : </label>
      <select
        className="bg-gray h-7 w-9"
        value={rowsPerPage}
        onChange={(e) => setRowsPerPage(Number(e.target.value))}
      >
        <option value={2}>2</option>
        <option value={4}>4</option>
        <option value={6}>6</option>
        <option value={8}>8</option>
      </select>
    </div>
  );
};
