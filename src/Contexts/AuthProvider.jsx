import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../Firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import useAxios from "../Hooks/useAxios";

const AuthProvider = ({ children }) => {
  const axiosInstance = useAxios();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   register user
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   sign in user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   update profile
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  //   LogOut user
  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  //   user observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const loggedUser = { email: currentUser.email };

        axiosInstance.post("/getToken", loggedUser).then((res) => {
          localStorage.setItem("token", res.data.token);
        });
      } else {
        localStorage.removeItem("token");
      }

      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, [axiosInstance]);

  const authInfo = {
    user,
    loading,
    setLoading,
    registerUser,
    signInUser,
    updateUserProfile,
    logOutUser,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
