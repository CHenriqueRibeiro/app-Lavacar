import React, { createContext, useContext, useState, useEffect } from "react";
import { firebaseAuth } from "../Config/Firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [personalData, setPersonalData] = useState({
    name: "",
    phoneNumber: "",
  });
  const [userDataLoaded, setUserDataLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((authUser) => {
      console.log("antes", firebaseAuth.currentUser);

      setUser(firebaseAuth.currentUser);
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
      setUser(response.user);
      await saveUserDataToAsyncStorage(response.user.uid);
      alert("Login realizado com sucesso!");
    } catch (error) {
      alert("Não foi possível fazer o login: " + error.message);
    }
  };

  const signUp = async (email, password, phone, name, carModel, motoModel) => {
    try {
      const response = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      setUser(response.user);

      await createUserInFirestore(
        response.user,
        phone,
        name,
        carModel,
        motoModel
      );

      await saveUserDataToAsyncStorage(response.user.uid);

      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      alert("Não foi possível realizar o cadastro: " + error.message);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(firebaseAuth);
      clearUserDataFromAsyncStorage();

      alert("Conta deslogada com sucesso!");
    } catch (error) {
      alert("Não foi possível deslogar da conta: " + error.message);
    }
  };
  const clearUserDataFromAsyncStorage = async () => {
    try {
      await AsyncStorage.removeItem("userData");
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
        setPersonalData(userData);
        setUserDataLoaded(true);

        return userData;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erro ao ler dados do usuário:", error.message);
      throw error;
    }
  };

  const updatePhoneNumber = async (userId, name, phoneNumber) => {
    const firestore = getFirestore();
    const userDocRef = doc(firestore, "Usuarios", userId);

    try {
      await setDoc(
        userDocRef,
        {
          name: name || "",
          phoneNumber: phoneNumber || "",
        },
        { merge: true }
      );

      alert("Dados Pessoais atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar dados pessoais:", error.message);
      throw error;
    }
  };
  const updateVehicleDataInFirestore = async (userId, carModel, motoModel) => {
    const firestore = getFirestore();
    const userDocRef = doc(firestore, "Usuarios", userId);

    try {
      await setDoc(
        userDocRef,
        {
          carModel: carModel || "",
          motoModel: motoModel || "",
        },
        { merge: true }
      );

      alert("Dados do veículo atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar dados do veículo:", error.message);
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
    updatePhoneNumber,
    readUserDataFromFirestore,
    updateVehicleDataInFirestore,
    personalData
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
