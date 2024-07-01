import React, { createContext, useReducer } from "react";

const UsersContext = createContext();

export const usersReducer = (state, action) => {
  switch (action.type) {
    case "LIST_USERS":
      return {
        users: action.payload,
      };
    case "CREATE_USER":
      return {
        users: [action.payload, ...state.users],
      };
      case "DELETE_USER":
        return {
            users: state.users.filter((w) => w._id !== action.payload._id)
        }
        case "UPDATE_USER":
          return {
            users: [action.payload, ...state.users],
          }
    default:
      return state;
  }
};

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
