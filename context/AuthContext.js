import React, { createContext, useContext, useState, useEffect } from "react";
import { firebaseAuth } from "../Config/Firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (authUser) => {
      setUser(authUser);
      setLoading(false);
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

      alert("Login realizado com sucesso!");
    } catch (error) {
      alert("Não foi possível fazer o login: " + error.message);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(firebaseAuth);
      clearUserDataFromAsyncStorage();
      console.log("Usuário deslogado do Firebase com sucesso!");
      alert("Conta deslogada com sucesso!");
    } catch (error) {
      console.log(error);
      alert("Não foi possível deslogar da conta: " + error.message);
    }
  };
  const clearUserDataFromAsyncStorage = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      console.log("Dados do usuário removidos do AsyncStorage.");
    } catch (error) {
      console.error(
        "Erro ao remover dados do usuário do AsyncStorage:",
        error.message
      );
      throw error;
    }
  };
  const getUserData = () => {
    return user;
  };

  const signUp = async (email, password, phone, name, carModel, motoModel) => {
    try {
      const response = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      await createUserInFirestore(
        response.user,
        phone,
        name,
        carModel,
        motoModel
      );
      await saveUserDataToAsyncStorage(
        response.user.uid,
        email,
        phone,
        name,
        carModel,
        motoModel
      );

      console.log(response);
      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      console.log(error);
      alert("Não foi possível realizar o cadastro: " + error.message);
    }
  };

  const createUserInFirestore = async (
    user,
    phone,
    name,
    carModel,
    motoModel
  ) => {
    const firestore = getFirestore();
    const userDocRef = doc(firestore, "Usuarios", user.uid);

    try {
      await setDoc(userDocRef, {
        email: user.email,
        phoneNumber: phone,
        name: name,
        carModel: carModel,
        motoModel: motoModel,
      });
    } catch (error) {
      throw error;
    }
  };

  const saveUserDataToAsyncStorage = async (
    userId,
    email,
    phone,
    name,
    carModel,
    motoModel
  ) => {
    try {
      const userData = {
        userId: userId,
        email: email,
        phone: phone,
        name: name,
        carModel: carModel,
        motoModel: motoModel,
      };

      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      console.log("Dados do usuário salvos no AsyncStorage.");
    } catch (error) {
      console.error(
        "Erro ao salvar dados do usuário no AsyncStorage:",
        error.message
      );
      throw error;
    }
  };

  const readUserDataFromFirestore = async (userId) => {
    const firestore = getFirestore();
    const userDocRef = doc(firestore, "Usuarios", userId);

    try {
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();

        return userData;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erro ao ler dados do usuário:", error.message);
      throw error;
    }
  };

  const updatePhoneNumberAndMore = async (user, phone, name) => {
    try {
      await Promise.all([
        updateProfile(user, {
          phoneNumber: phone,
          name: name,
        }),
      ]);
    } catch (error) {
      throw error;
    }
  };

  const contextValue = {
    user,
    loading,
    signIn,
    signOut: signOutUser,
    getUserData,
    signUp,
    updatePhoneNumberAndMore,
    readUserDataFromFirestore,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
