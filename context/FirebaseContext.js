import React, { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../Config/Firebase";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [horarioReservado, setHorarioReservado] = useState({});
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [servicoSelecionado, setServicoSelecionado] = useState({});
  const [dataSelecionada, setDataSelecionada] = useState();
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [telefone, setTelefone] = useState("");
  const handleClose = () => setShowActionsheet(!showActionsheet);
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "Estabelecimentos", "Empresa 1");
      try {
        const docSnap = await getDoc(docRef);

        setTelefone(docSnap.data().DadosDaEmpresa.Telefone);

        if (docSnap.exists()) {
          setHorarioReservado(docSnap.data().HorarioReservado || {});
          setHorariosDisponiveis(docSnap.data().Horarios || []);
        } else {
          console.log("Nao tem documento!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };
    fetchData();
  }, []);

  const fetchData = async () => {
    const docRef = doc(db, "Estabelecimentos", "Empresa 1");

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setHorarioReservado(docSnap.data().HorarioReservado || {});
        setHorariosDisponiveis(docSnap.data().Horarios || []);
      }
    } catch (error) {
      console.error("Error getting document:", error);
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
      setServicoSelecionado(updatedData);
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
    const dataAgendamento = await AsyncStorage.getItem("dataAgendamento");

    if (dataAgendamento !== null) {
      console.log("Data agendada:", JSON.parse(dataAgendamento));
    } else {
      console.log("Nenhum agendamento encontrado.");
    }
    handleClose();
  };
  const sendAgendamentoToFirestore = async () => {
    try {
      const agendamentoData = await AsyncStorage.getItem("agendamento");
      const agendamento = JSON.parse(agendamentoData);

      if (agendamento && agendamento.data && agendamento.servico) {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid;
            const estabelecimentoDocRef = doc(
              db,
              "Estabelecimentos",
              "Empresa 1"
            );
            const estabelecimentoDocSnap = await getDoc(estabelecimentoDocRef);
            const agendamentosEstabelecimento = estabelecimentoDocSnap.exists()
              ? estabelecimentoDocSnap.data().Agendamentos || []
              : [];

            const updatedAgendamentosEstabelecimento = [
              ...agendamentosEstabelecimento,
              {
                ...agendamento,
                servicoRealizado: false,
                servicoCancelado: false,
              },
            ];

            await updateDoc(estabelecimentoDocRef, {
              Agendamentos: updatedAgendamentosEstabelecimento,
            });

            console.log(
              "Dados do agendamento enviados para o Firestore (Estabelecimento):",
              agendamento
            );

            const usuarioDocRef = doc(db, "Usuarios", uid);
            const usuarioDocSnap = await getDoc(usuarioDocRef);
            const agendamentosUsuario = usuarioDocSnap.exists()
              ? usuarioDocSnap.data().Agendamentos || []
              : [];

            const updatedAgendamentosUsuario = [
              ...agendamentosUsuario,
              {
                ...agendamento,
                servicoRealizado: false,
                servicoCancelado: false,
              },
            ];

            await updateDoc(usuarioDocRef, {
              Agendamentos: updatedAgendamentosUsuario,
            });

            console.log(
              "Dados do agendamento enviados para o Firestore (Usuário):",
              agendamento
            );

            await AsyncStorage.removeItem("agendamento");
          } else {
            console.warn("Usuário não autenticado.");
          }
        });
      } else {
        console.warn("Dados de agendamento inválidos ou ausentes.");
      }
    } catch (error) {
      console.error(
        "Erro ao enviar dados de agendamento para o Firestore:",
        error.message
      );
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        horarioReservado,
        horariosDisponiveis,
        updateHorariosDisponiveis,
        servicoEscolhido,
        agendamento,
        lerAgendamento,
        showActionsheet,
        handleClose,
        setDataSelecionada,
        sendAgendamentoToFirestore,
        telefone,
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
