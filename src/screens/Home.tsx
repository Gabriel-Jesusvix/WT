import { GroupButton } from "@components/GroupButton";
import { Header } from "@components/Header";
import { FlatList, VStack } from "native-base";
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
      renderItem={({item}) => (
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

    </VStack>
  )
}
