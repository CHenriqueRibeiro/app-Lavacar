import {
  HStack,
  Heading,
  View,
  VStack,
  Text,
  Button,
  ButtonText,
  Input,
  InputField,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, StatusBar } from "react-native";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
export default function Scheduling() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, loading, signIn, signOut, getUserData } = useAuth();

  const signInUser = async () => {
    signIn(email, password);
  };

  const signOutUser = async () => {
    signOut();
  };

  const showUserData = () => {
    const userData = getUserData();
    console.log("User Data:", userData);
    alert(`Email do usuário: ${userData ? userData.email : "Não logado"}`);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#4D0288" />
      <View backgroundColor="#E9EDF0" flex={1} alignItems="center">
        <HStack
          height={70}
          backgroundColor="#4D0288"
          width={"100%"}
          alignItems="center"
        >
          <Ionicons name="chevron-back" size={30} color="#FFFFFF" />
          <Heading color="#FFFFFF">Perfil</Heading>
        </HStack>

        {/* Restante do código... */}

        <VStack
          width={"90%"}
          height={240}
          marginTop={15}
          backgroundColor="blue"
          alignItems="center"
          gap={15}
        >
          <Heading color="#FFFFFF">Login</Heading>
          <Input
            variant="outline"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            width={"95%"}
          >
            <InputField
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
              autoCapitalize="none"
              value={email}
            />
          </Input>
          <Input
            variant="outline"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            width={"95%"}
          >
            <InputField
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              placeholder="Senha"
              autoCapitalize="none"
              value={password}
            />
          </Input>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <>
              <Button onPress={signInUser}>
                <ButtonText>Login</ButtonText>
              </Button>
              <Button onPress={showUserData}>
                <ButtonText>Mostrar Dados do Usuário</ButtonText>
              </Button>
            </>
          )}
        </VStack>

        <Button
          alignItems="center"
          width={"50%"}
          marginTop={15}
          justifyContent="space-around"
          onPress={signOutUser}
        >
          <ButtonText>Deslogar</ButtonText>
          <Ionicons name="log-out-outline" size={24} color="black" />
        </Button>
      </View>
    </>
  );
}
