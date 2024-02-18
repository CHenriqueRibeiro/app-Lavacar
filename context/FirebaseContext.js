import React, { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../Config/Firebase";
import { onLog } from "firebase/app";

const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [horarioReservado, setHorarioReservado] = useState({});
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [servicoSelecionado, setServicoSelecionado] = useState({});
  const [dataSelecionada, setDataSelecionada] = useState();
  const [showActionsheet, setShowActionsheet] = useState(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);
  useEffect(() => {
    // const fetchData = async () => {
    //   const docRef = doc(db, "Estabelecimentos", "Empresa 1");
    //   try {
    //     const docSnap = await getDoc(docRef);
    //     // const horarioReservadoData = docSnap.data().HorarioReservado || {};
    //     // const horariosDisponiveisData = docSnap.data().Horarios || [];
    //     if (docSnap.exists()) {
    //       setHorarioReservado(docSnap.data().HorarioReservado || {});
    //       setHorariosDisponiveis(docSnap.data().Horarios || []);
    //     } else {
    //       console.log("Nao tem documento!");
    //     }
    //   } catch (error) {
    //     console.error("Error getting document:", error);
    //   }
    // };
    // fetchData();
  }, []);

  const fetchData = async () => {
    const docRef = doc(db, "Estabelecimentos", "Empresa 1");

    try {
      const docSnap = await getDoc(docRef);
      // const horarioReservadoData = docSnap.data().HorarioReservado || {};
      // const horariosDisponiveisData = docSnap.data().Horarios || [];

      if (docSnap.exists()) {
        setHorarioReservado(docSnap.data().HorarioReservado || {});
        setHorariosDisponiveis(docSnap.data().Horarios || []);
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };

  const updateHorarioReservado = async (updatedData) => {
    try {
      const docRef = doc(db, "Estabelecimentos", "Empresa 1");
      await updateDoc(docRef, { HorarioReservado: updatedData });
      setHorarioReservado(updatedData);
    } catch (error) {
      console.error("Error updating HorarioReservado:", error);
    }
  };

  const updateHorariosDisponiveis = async (updatedData) => {
    try {
      const docRef = doc(db, "Estabelecimentos", "Empresa 1");
      await updateDoc(docRef, { Horarios: updatedData });
      setHorariosDisponiveis(updatedData);
    } catch (error) {
      console.error("Error updating Horarios:", error);
    }
  };
  const servicoEscolhido = async (updatedData) => {
    try {
      const docRef = doc(db, "Estabelecimentos", "Empresa 1");
      await updateDoc(docRef, { HorarioReservado: updatedData });
      setServicoSelecionado(servicoSelecionado);
    } catch (error) {
      console.error("Error updating ServicoEscolhido:", error);
    }
  };
  const agendamento = async () => {
    try {
      if (horarioReservado) {
        await AsyncStorage.setItem(
          "dataAgendamento",
          JSON.stringify(horarioReservado)
        );
      } else {
        console.warn("Não há horário reservado para agendar.");
      }
    } catch (error) {
      console.error("Erro ao agendar horário:", error);
    }
  };
  const lerAgendamento = async () => {
    fetchData();

    handleClose();
    //   const dataAgendamento = await AsyncStorage.getItem("dataAgendamento");

    //   if (dataAgendamento !== null) {
    //     console.log("Data agendada:", JSON.parse(dataAgendamento));
    //   } else {
    //     console.log("Nenhum agendamento encontrado.");
    //   } handleClose();
    // } catch (error) {
    //   console.error("Erro ao ler agendamento:", error);
    // }
  };

  return (
    <FirebaseContext.Provider
      value={{
        horarioReservado,
        horariosDisponiveis,
        updateHorarioReservado,
        updateHorariosDisponiveis,
        servicoEscolhido,
        agendamento,
        lerAgendamento,
        showActionsheet,
        handleClose,
        setDataSelecionada,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase deve ser usado dentro de um FirebaseProvider");
  }
  return context;
};
