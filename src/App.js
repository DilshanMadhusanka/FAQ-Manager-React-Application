import { useState } from "react";
import "./App.css";
import { Table } from "./components/Table";
import { Modal } from "./components/Modal";
import { IoMdAddCircle } from "react-icons/io";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      number: "1",
      question: "What is the vision of the iLabs ?",
      category: "About Companay",
      status: "Published",
    },
    {
      number: "2",
      question: "What is the mission of the iLabs ?",
      category: "About Companay",
      status: "Published",
    },
    {
      number: "3",
      question: "When iLabs got establieshed ?",
      category: "About Companay",
      status: "Draft",
    },
  ]);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  return (
    <div className="bg-[#dcdbed] p-3 ">
      <div>
        <div className="flex items-center justify-between  ">
          <h1 className="font-semibold text-2xl">FAQ Manager - iLabs</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="text-white hover:bg-[#373261] bg-[#7a77a3] cursor-pointer font-medium  text-sm px-5 py-2.5 flex items-center shadow rounded-[5px]"
          >
            <IoMdAddCircle className=" mr-4 bg-blue" />
            Add New Question
          </button>
        </div>

        <Table
          rows={rows}
          deleteRow={handleDeleteRow}
          editRow={handleEditRow}
        />

        {modalOpen && (
          <Modal
            closeModal={() => {
              setModalOpen(false);
              setRowToEdit(null);
            }}
            onSubmit={handleSubmit}
            defaultValue={rowToEdit !== null && rows[rowToEdit]}
          />
        )}
      </div>

      <div className="flex  items-center justify-between mt-10 mb-7 pl-3 pr-3  ">
        <div className="text-[12px] opacity-80">
          copyright @ iLabs. All Rights Reserved
        </div>
        <div className="text-[12px] opacity-80">
          @ Privacy Policy | Terms of Service | Help Center
        </div>
      </div>
    </div>
  );
}

export default App;
