import { Text, VStack } from "@gluestack-ui/themed";

export default function Card() {
  return (
    <VStack
      width={"95%"}
      backgroundColor="red"
      height={120}
      borderRadius={"$lg"}
    >
      <Text>card</Text>
    </VStack>
  );
}
