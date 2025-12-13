import React from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {






  const authInfo = {
    email: "mehedi@gmail.com",
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
