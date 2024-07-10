import React, { useState, useMemo } from "react";
import { BsFillTrashFill, BsFillPencilFill, BsThreeDots } from "react-icons/bs";
import { Search } from "./Search";
import { RowsPerPage } from "./RowsPerPage"; 

export const Table = ({ rows, deleteRow, editRow }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeRow, setActiveRow] = useState(null);


  const sortedRows = useMemo(() => {
    if (sortConfig.key !== null) {
      return [...rows].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return rows;
  }, [rows, sortConfig]);



  const filteredRows = useMemo(() => {
    return sortedRows.filter((row) =>
      Object.values(row).some((val) =>
        val.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [sortedRows, searchQuery]);



  const displayedRows = useMemo(() => {
    return filteredRows.slice(0, rowsPerPage);
  }, [filteredRows, rowsPerPage]);



  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };


  const handleSearch = (query) => {
    setSearchQuery(query);
  };


  const toggleActions = (idx) => {
    setActiveRow(activeRow === idx ? null : idx);
  };


  return (
    <div className="mt-8 w-full">
      <div className="bg-white p-5 rounded-[9px] mb-8">
        <Search onSearch={handleSearch} className="items-center pt-4" />
      </div>

      <div className="bg-white rounded-[9px] overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("number")}
              >
                #
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("question")}
              >
                Question
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("category")}
              >
                Category
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("status")}
              >
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-black uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedRows.map((row, idx) => {
              const statusText =
                row.status.charAt(0).toUpperCase() + row.status.slice(1);

              return (
                <tr key={idx} className="justify-start">
                  <td className="px-6 py-4 whitespace-nowrap">{row.number}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {row.question}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {row.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-[4px]  bg-green-500 w-[100px] h-7`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <BsThreeDots
                      className="toggle-actions-btn cursor-pointer"
                      onClick={() => toggleActions(idx)}
                    />
                    {activeRow === idx && (
                      <div className="actions-menu mt-2 p-2 bg-white rounded shadow-lg w-40 h-20">
                        <div className="flex items-center gap-4">
                          <BsFillTrashFill
                            className="delete-btn cursor-pointer"
                            onClick={() => deleteRow(idx)}
                          />
                          <span className="mr-2">Delete</span>
                        </div>
                        <div className="flex items-center mt-2 gap-4">
                          <BsFillPencilFill
                            className="edit-btn cursor-pointer"
                            onClick={() => editRow(idx)}
                          />
                          <span className="mr-2"> Edit</span>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end  bg-white border-t-2 border-gray-200 h-12 pr-5 pt-2 rounded-b-[9px]">
        <RowsPerPage
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </div>
    </div>
  );
};
