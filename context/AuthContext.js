import React, { createContext, useContext, useState, useEffect } from "react";
import { firebaseAuth } from "../Config/Firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (authUser) => {
      setUser(authUser);
      setLoading(false);
      console.log("esse e o usuario", user);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      console.log(response);
      alert("Login realizado com sucesso!");
    } catch (error) {
      console.log(error);
      alert("Não foi possível fazer o login: " + error.message);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(firebaseAuth);
      console.log("Usuário deslogado do Firebase com sucesso!");
      alert("Conta deslogada com sucesso!");
    } catch (error) {
      console.log(error);
      alert("Não foi possível deslogar da conta: " + error.message);
    }
  };

  const getUserData = () => {
    return user;
  };

  const contextValue = {
    user,
    loading,
    signIn,
    signOut: signOutUser,
    getUserData,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
