import BackgroundIMG from "@assets/background.png";
import Logo from "@assets/logo.svg";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from "@react-navigation/native";
import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const signUpResolver = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o email').email('Email inválido'),
  password:yup.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 digítos'),
  password_confirm:yup.string().required('Confirme sua senha.').oneOf([yup.ref('password')], 'Senhas não confere')
}).required();

export function SignUp() {
  const { goBack } = useNavigation()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpResolver),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirm: ''
    },
  });

  function handleGoBackToSignIn() {
    goBack()
  }

  async function handleSignUp(data: FormDataProps) {
    console.log(data)
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}  px={10} pb={16}>
        <Image
          source={BackgroundIMG}
          defaultSource={BackgroundIMG}
          alt="Pessoas treinando"
          resizeMode="contain"
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
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value }}) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}

              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value }}) => (
              <Input
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value }}) => (
              <Input
                placeholder="Senha"
                onChangeText={onChange}
                value={value}
                secureTextEntry
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value }}) => (
              <Input
                placeholder="Confirme sua senha"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password_confirm?.message}
                secureTextEntry
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
              />
            )}
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
          />

        </Center>

        <Button title="Voltar para o login" variant="outline" mt={24} onPress={handleGoBackToSignIn} />
      </VStack>
    </ScrollView>
  );
}
