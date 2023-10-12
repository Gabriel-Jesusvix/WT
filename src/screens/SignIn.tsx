import { VStack, Image, Text, Center, Heading } from 'native-base'
import BackgroundIMG from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { Input } from '@components/Input'

export function SignIn() {
  return (
    <VStack flex={1} bg="gray.700">
      <Image
        source={BackgroundIMG}
        alt='Pessoas treinando'
        resizeMode='contain'
        position="absolute"
      />
      <Center my={24}>
        <Logo />
        <Text color="gray.100" fontSize="sm">
          Treine sua mente e o seu corpo
        </Text>
      </Center>
      <Center>
        <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
          Acesse sua conta
        </Heading>

        <Input 
          placeholder='Email'
        />
        <Input 
          placeholder='Senha'
        />
      </Center>

    </VStack>
  )
}