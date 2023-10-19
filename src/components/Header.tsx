import defaultAvatar from '@assets/userPhotoDefault.png';
import { useAuth } from '@contexts/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { HStack, Heading, Icon, Text, VStack } from "native-base";
import { TouchableOpacity } from 'react-native';
import { UserAvatar } from "./UserAvatar";

export function Header() {
  const { user, signOut } = useAuth()
  return (
    <HStack
      bg="gray.600"
      pt={16}
      pb={5}
      px={8}
      alignItems="center"
    >
      <UserAvatar
        size={16}
        source={ user.avatar ? {uri: user.avatar} : defaultAvatar }
        alt="Imagem do usuario"
        mr={4}
      />

      <VStack flex={1}>
        <Text
          color="gray.100"
          fontSize="md"
        >
          Olá
        </Text>
        <Heading
          color="gray.100"
          fontSize="md"
        >
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon
          as={MaterialIcons}
          name="logout"
          color="gray.200"
          size={7}
        />
      </TouchableOpacity>

    </HStack>
  )
}
