import React, { useEffect } from "react";
import ResponsiveTable from "../Components/ResponsiveTable";
import axios from "axios";
import useUsersContext from "../hooks/useUsersContext";

const Home = () => {
  const {dispatch} = useUsersContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/users");
        const json = response.data;
        dispatch({type: 'LIST_USERS', payload: json})
        //console.log(users)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="container">
      <div className="flex items-center justify-center mt-9">
        <div className="text-center">
        <h1 className="sm:text-5xl md:text-9xl text-5xl text-bookmark-fonts">The Contacts</h1>
        <p className="mt-4 sm:text-lg text-sm italic text-gray-500">The personal address book</p>
        </div>
      </div>

      <ResponsiveTable rowsPerPage={5}/>
    </div>
  );
};

export default Home;
