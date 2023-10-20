import { ExerciseCard } from "@components/ExerciseCard";
import { GroupButton } from "@components/GroupButton";
import { Header } from "@components/Header";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorBottomRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { FlatList, HStack, Heading, Text, VStack, useToast } from "native-base";
import { useEffect, useState } from "react";


export function Home() {
  const [groupSelected, setGroupSelected] = useState('Costas')
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState(['Puxada frontal', 'Remada curvada', 'Remada unilateral', 'Levantamento terras']);
  const { navigate } = useNavigation<AppNavigatorBottomRoutesProps>()
  const toast = useToast();


  function handleOpenExerciseDetails() {
    navigate('exercise')
  }

  async function fetchGroups() {
    try {
      const response = await api.get('/groups');
      setGroups(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  useEffect(() => {
    fetchGroups();
  },[])
  return (
    <VStack flex={1}>
      <Header />
      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupButton
            name={item}
            isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
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
        minH={10}
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
            {exercises.length}
          </Text>
        </HStack>
        <FlatList
          data={exercises}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <ExerciseCard
              onPress={handleOpenExerciseDetails}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            paddingBottom: 20
          }}
        />
      </VStack>

    </VStack>
  )
}
