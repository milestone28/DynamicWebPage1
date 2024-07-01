import React, { createContext, useReducer } from "react";

// Create UsersContext
const UsersContext = createContext();

// Reducer function to handle state changes based on action types
const usersReducer = (state, action) => {
  switch (action.type) {
    case "LIST_USERS":
      return {
        ...state,
        users: action.payload,
      };
      
    case "CREATE_USER":
      return {
        ...state,
        users: [action.payload, ...state.users],
      };

    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload._id),
      };

    // case "UPDATE_USER":
    //   return {
    //     ...state,
    //     users: state.users.map(user =>
    //       user._id === action.payload._id ? { ...user, ...action.payload } : user
    //     ),
    //   };

    default:
      return state;
  }
};

// Provider component to wrap the application and provide the context
export const UsersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, {
    users: [],
  });

  return (
    <UsersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
