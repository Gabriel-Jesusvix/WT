import { ExerciseCard } from "@components/ExerciseCard";
import { GroupButton } from "@components/GroupButton";
import { Header } from "@components/Header";
import { FlatList, HStack, Heading, Text, VStack } from "native-base";
import { useState } from "react";


export function Home() {
  const [groupSelected, setGroupSelected] = useState('Costas')
  const [groups, setGroups] = useState(['Costas', 'Bíceps', 'Tríceps', 'ombro'])

  return (
    <VStack flex={1}>
      <Header />
      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupButton
            name={item}
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          px: 8,
        }}
        my={10}
        maxHeight={10}
      />
      <VStack flex={1} px={8}>

        <HStack
          justifyContent="space-between"
          mb={5}
        >
          <Heading
            color="gray.200"
            fontSize="md"
          >
            Exercício
          </Heading>

          <Text
            color="gray.200"
            fontSize="sm"
          >
            4
          </Text>
        </HStack>
        <ExerciseCard />
        <ExerciseCard />
      </VStack>

    </VStack>
  )
}