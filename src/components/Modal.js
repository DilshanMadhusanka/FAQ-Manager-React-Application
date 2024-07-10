import React, { useState } from "react";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      number: "",
      question: "",
      category: "",
      status: "",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (
      formState.number &&
      formState.question &&
      formState.category &&
      formState.status
    ) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white w-[350px] rounded shadow-lg">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Modal Title</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="number"
                className="block text-sm font-medium text-gray-700"
              >
                Number
              </label>
              <input
                type="text"
                id="number"
                name="number"
                value={formState.number}
                onChange={handleChange}
                className="mt-1 block w-full  rounded-sm shadow-sm sm:text-sm border border-gray-200 h-8"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="question"
                className="block text-sm font-medium text-gray-700"
              >
                Question
              </label>
              <textarea
                id="question"
                name="question"
                value={formState.question}
                onChange={handleChange}
                rows="3"
                className="mt-1  w-full  rounded-sm shadow-sm sm:text-sm border border-gray-200"
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formState.category}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-sm shadow-sm  sm:text-sm h-7"
              >
                <option value="aboutcompany">About Company</option>
                <option value="Draft">About Projects</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formState.status}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-sm shadow-sm  h-7"
              >
                <option value="published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
            {errors && (
              <div className="text-red-500 text-sm mb-4 border border-red-600 p-2 ">
                Please include: {errors}
              </div>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white bg-blue-500 px-4 py-2 rounded-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
