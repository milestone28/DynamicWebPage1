import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Moment from "moment";
import useUsersContext from "../hooks/useUsersContext";

const ResponsiveTable = ({ rowsPerPage }) => {
  
  const [_error, _setError] = useState("");
  const {users} = useUsersContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);


   const totalPages = Math.ceil(users.length / rowsPerPage);
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = users.slice(indexOfFirstRow, indexOfLastRow);

  const schema = yup.object().shape({
    firstName: yup.string().required("First Name is required."),
    lastName: yup.string().required("Last Name is required."),
    address: yup.string().required("Address is required."),
    email: yup
      .string()
      .email("Invalid email format.")
      .required("Email is required."),
    mobileNumber: yup
      .string()
      .matches(/^[0-9]+$/, "Mobile number must be digits only.")
      .min(10, "Mobile Number must be at least 10 digits.")
      .max(13, "Mobile Number must be at most 13 digits.")
      .required("Mobile Number is required."),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/api", data);
      console.log("Data posted successfully:", response.data);
      reset();
      setShowModal(false);
    } catch (error) {
      console.error("Error posting data:", error);
      
      _setError(error.response.data.error);
      console.log(_error);
    }
  };

  return (
    <div className="p-5 mt-9">
      <div className="flex justify-between items-center justify-center">
        <h1 className="text-2xl mb-2 text-bookmark-fonts">List Personel</h1>
        <ion-icon
          class="text-xl item-center font-semibold cursor-pointer text-gray-900 bg-bookmark-bg hover:bg-bookmark-bg2 p-1 rounded"
          name="person-add-outline"
          onClick={() => {
            setShowModal(true);
          }}
        ></ion-icon>
      </div>

      <div className="flex flex-col hidden md:block h-96">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 w-max">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
              <table className="min-w-full">
                <thead className="bg-bookmark-hl">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                    >
                      Mobile Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                    >
                      Date Created
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentRows.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-slate-100 cursor-pointer odd:bg-white even:bg-slate-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 uppercase">
                        {item.firstName} {item.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.mobileNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 uppercase">
                        {item.address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {Moment(item.createdAt).format("DD-MM-YYYY")}
                      </td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {currentRows.map((item, index) => (
          <div className="bg-white rounded-lg shadow p-4">
            <div className="items-center text-sm">
              <div>
                <span className="font-semibold">Date Created : </span>
                {Moment(item.createdAt).format("DD-MM-YYYY")}
              </div>
              <p>
                <span className="font-semibold">Name : </span>
                <span className="uppercase">
                  {" "}
                  {item.firstName} {item.lastName}{" "}
                </span>
              </p>
              <div>
                <span className="font-semibold">Address : </span>
                <span className="uppercase">{item.address}</span>
              </div>
              <div>
                <span className="font-semibold">Email : </span>
                {item.email}
              </div>
              <div>
                <span className="font-semibold">Mobile Number : </span>
                {item.mobileNumber}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-9 flex justify-between">
        <button
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-bookmark-hl text-white rounded disabled:bg-bookmark-bg disabled:text-gray-800 disabled:opacity-50 enabled:hover:bg-bookmark-bg2"
        >
          Previous
        </button>
        <div className="flex">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handleClick(index + 1)}
              className={`px-4 py-2 mx-1 ${
                currentPage === index + 1
                  ? "bg-bookmark-fonts text-white"
                  : "bg-bookmark-bg text-gray-800"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-bookmark-hl text-white rounded disabled:bg-bookmark-bg disabled:text-gray-800 disabled:opacity-50 enabled:hover:bg-bookmark-bg2"
        >
          Next
        </button>
      </div>

      <Modal
        className="w-full"
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <div className="border-b border-gray-900/10 pb-12 w-96">
          <button
            className="absolute  top-2  right-2 text-2xl"
            onClick={() => {
              setShowModal(false);
              reset();
            }}
          >
            <ion-icon name="close-outline"></ion-icon>
          </button>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    {...register("firstName")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    {...register("lastName")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.lastName && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {" "}
                  Email address{" "}
                </label>

                <div className="mt-2">
                  <input
                    id="email"
                    {...register("email")}
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="mobileNumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {" "}
                  Phone Number{" "}
                </label>
                <div className="mt-2">
                  <input
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    id="mobileNumber"
                    {...register("mobileNumber")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.mobileNumber && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.mobileNumber.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-full mb-9">
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="address"
                  id="address"
                  {...register("address")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.address && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-bookmark-fonts text-white font-medium text-sm rounded-md shadow-sm hover:bg-bookmark-hl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
            {_setError && (<p className="text-red-600 text-sm mt-4">{_error}</p>)}
            
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ResponsiveTable;
