import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Heading, SectionList, Text, VStack } from "native-base";
import { useState } from "react";


export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '14/10/23',
      data: ["Puxada frontal", "Remanda unilateral"]
    },
    {
      title: '13/10/23',
      data: ["Puxada frontal"]
    },
  ])
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios"/>
      <SectionList
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <HistoryCard />
        )}
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3}>{section.title}</Heading>
        )}
        px={8}
        contentContainerStyle={exercises.length === 0 && {flex: 1, justifyContent: 'center'}}
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            Não há exercícios registrados ainda.
            Vamos treinar hoje?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />

    </VStack>
  )
}
