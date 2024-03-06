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
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Select,
  SelectItem,
  SelectTrigger,
  SelectInput,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectPortal,
  SelectBackdrop,
  InputSlot,
  InputIcon,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, StatusBar } from "react-native";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import PersonalInformation from "./PersonalInformation";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import MaskInput, { Masks } from "react-native-mask-input";
import { firebaseAuth } from "../Config/Firebase";
import { updateProfile } from "@firebase/auth";
export default function Scheduling() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [registrationMode, setRegistrationMode] = useState(false);
  const [vehicleType, setVehicleType] = useState(null);
  const [carModel, setCarModel] = useState("");
  const [motoModel, setMotoModel] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user, loading, signIn, signUp } = useAuth();
  const navigation = useNavigation();

  const signInUser = async () => {
    signIn(email, password);
  };

  const toggleRegistrationMode = () => {
    setRegistrationMode(!registrationMode);
  };

  const handleFinishRegistration = async () => {
    try {
      await signUp(email, password, phone, name, carModel, motoModel);

      const user = firebaseAuth.currentUser;
      await updateDisplayNameInFirebase(user, name);

      setEmail("");
      setPassword("");
      setPhone("");
      setCarModel("");
      setMotoModel("");
    } catch (error) {
      console.error("Erro ao finalizar o cadastro:", error.message);
    }
  };

  const updateDisplayNameInFirebase = async (user, displayName) => {
    try {
      await updateProfile(user, { displayName });
    } catch (error) {
      console.error(
        "Erro ao configurar o displayName no Firebase Authentication:",
        error.message
      );
      throw error;
    }
  };

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#4D0288" />
      <View
        backgroundColor="#E9EDF0"
        flex={1}
        alignItems="center"
        width={"100%"}
      >
        <HStack
          height={70}
          backgroundColor="#4D0288"
          width={"100%"}
          alignItems="center"
        >
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Ionicons name="chevron-back" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <Heading color="#FFFFFF">
            {user === null ? "Acesse sua conta" : "Perfil"}
          </Heading>
        </HStack>

        <VStack
          width={"95%"}
          height={240}
          marginTop={15}
          alignItems="center"
          gap={15}
        >
          {user !== null ? (
            <PersonalInformation />
          ) : (
            <>
              <Heading color="#4D0288">
                {registrationMode ? "Preencha seus dados" : "Login"}
              </Heading>
              <Input
                variant="outline"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                width={"95%"}
                borderColor="#4D0288"
              >
                <InputField
                  onChangeText={(text) => setEmail(text)}
                  placeholder="Email"
                  color="#4D0288"
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
                borderColor="#4D0288"
              >
                <InputField
                  onChangeText={(text) => setPassword(text)}
                  placeholder="Senha"
                  color="#4D0288"
                  autoCapitalize="none"
                  value={password}
                  secureTextEntry={!showPassword}
                />
                <InputSlot pr="$3" onPress={handleState}>
                  {showPassword ? (
                    <AntDesign name="eye" size={24} color="black" />
                  ) : (
                    <Ionicons name="eye-off" size={24} color="black" />
                  )}
                </InputSlot>
              </Input>

              {registrationMode && (
                <>
                  <Input
                    variant="outline"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    width={"95%"}
                    borderColor="#4D0288"
                  >
                    <InputField
                      onChangeText={(text) => setName(text)}
                      placeholder="Nome"
                      color="#4D0288"
                      value={name}
                    />
                  </Input>
                </>
              )}
              {registrationMode && (
                <>
                  <Input
                    variant="outline"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    width={"95%"}
                    borderColor="#4D0288"
                  >
                    <MaskInput
                      onChangeText={(text) => setPhone(text)}
                      placeholder="Número de Telefone"
                      color="#4D0288"
                      keyboardType="numeric"
                      value={phone}
                      mask={Masks.BRL_PHONE}
                    />
                  </Input>
                </>
              )}
              {registrationMode && (
                <>
                  <Select
                    width={"95%"}
                    onValueChange={(value) => setVehicleType(value)}
                  >
                    <SelectTrigger variant="outline" size="md">
                      <SelectInput placeholder="Selecione seu(s) veiculos" />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <SelectItem label="Carro" value="carro" />
                        <SelectItem label="Moto" value="moto" />
                        <SelectItem label="Carro e moto" value="carro-moto" />
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                </>
              )}

              {vehicleType === "carro" && (
                <Input
                  variant="outline"
                  size="md"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  width={"95%"}
                  borderColor="#4D0288"
                >
                  <InputField
                    onChangeText={(text) => setCarModel(text)}
                    placeholder="Modelo do Carro"
                    color="#4D0288"
                    value={carModel}
                  />
                </Input>
              )}

              {vehicleType === "moto" && (
                <Input
                  variant="outline"
                  size="md"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  width={"95%"}
                  borderColor="#4D0288"
                >
                  <InputField
                    onChangeText={(text) => setMotoModel(text)}
                    placeholder="Modelo da Moto"
                    color="#4D0288"
                    value={motoModel}
                  />
                </Input>
              )}

              {vehicleType === "carro-moto" && (
                <>
                  <Input
                    variant="outline"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    width={"95%"}
                    borderColor="#4D0288"
                  >
                    <InputField
                      onChangeText={(text) => setCarModel(text)}
                      placeholder="Modelo do Carro"
                      color="#4D0288"
                      value={carModel}
                    />
                  </Input>

                  <Input
                    variant="outline"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    width={"95%"}
                    borderColor="#4D0288"
                  >
                    <InputField
                      onChangeText={(text) => setMotoModel(text)}
                      placeholder="Modelo da Moto"
                      color="#4D0288"
                      value={motoModel}
                    />
                  </Input>
                </>
              )}

              {loading ? (
                <ActivityIndicator />
              ) : (
                <>
                  {!registrationMode && (
                    <>
                      <HStack gap={12}>
                        <Text>Esqueceu a senha?</Text>
                        <ButtonText
                          color="blue"
                          onPress={() => setShowModal(true)}
                        >
                          Redefinir senha
                        </ButtonText>
                      </HStack>
                      <Button
                        onPress={signInUser}
                        backgroundColor="#4D0288"
                        borderRadius={8}
                        width={"80%"}
                        height={48}
                      >
                        <ButtonText>Entrar</ButtonText>
                      </Button>
                    </>
                  )}

                  {!registrationMode && (
                    <Button
                      onPress={toggleRegistrationMode}
                      backgroundColor="#4D0288"
                      borderRadius={8}
                      width={"80%"}
                      height={48}
                    >
                      <ButtonText>Criar conta</ButtonText>
                    </Button>
                  )}
                  {registrationMode && (
                    <>
                      <Button
                        onPress={toggleRegistrationMode}
                        backgroundColor="#4D0288"
                        borderRadius={8}
                        width={"80%"}
                        height={48}
                      >
                        <ButtonText>Voltar</ButtonText>
                      </Button>
                      <Button
                        onPress={handleFinishRegistration}
                        backgroundColor="#4D0288"
                        borderRadius={8}
                        width={"80%"}
                        height={48}
                      >
                        <ButtonText>Finalizar Cadastro</ButtonText>
                      </Button>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </VStack>
      </View>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader borderBottomWidth="$0">
            <VStack space="sm">
              <Heading size="lg" color="#4D0288">
                Esqueceu sua senha?
              </Heading>
              <Text size="sm">
                Não tem problema, basta clicar no link que você vai receber por
                email e criar sua nova senha.
              </Text>
            </VStack>
          </ModalHeader>
          <ModalBody>
            <Input
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              width={"100%"}
              borderColor="#4D0288"
            >
              <InputField placeholder="Digite seu email" color="#4D0288" />
            </Input>
          </ModalBody>
          <ModalFooter borderTopWidth="$0">
            <VStack space="lg" w="$full">
              <Button>
                <ButtonText>Enviar</ButtonText>
              </Button>
              <HStack>
                <Button
                  variant="link"
                  size="sm"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  <Ionicons name="chevron-back" size={20} color="#4D0288" />
                  <ButtonText color="#4D0288" textDecorationLine="none">
                    Voltar para login
                  </ButtonText>
                </Button>
              </HStack>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
