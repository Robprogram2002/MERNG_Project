import React, { createContext, useReducer } from "react";

const AuthContext = createContext({
  user: null,
  userToken: null,
  login: (userData) => {},
  logOut: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        userToken: action.payload.token,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}

const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  const login = (userData) => {
    localStorage.setItem("userToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logOut = () => {
    localStorage.removeItem("userToken");
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logOut }}
      {...props}
    ></AuthContext.Provider>
  );
};

export { AuthContext, ContextProvider };
