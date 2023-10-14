import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserAvatar } from "@components/UserAvatar";
import { Center, Heading, Skeleton, Text, VStack } from "native-base";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";

const PHOTO_SIZE = 33
export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  return (
    <VStack flex={1}>
      <ScreenHeader title="Profile" />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 36
        }}
      >
        <Center
          mt={6}
          px={10}
        >
          {
            photoIsLoading ? (
              <Skeleton
                w={PHOTO_SIZE}
                h={PHOTO_SIZE}
                rounded="full"
                startColor="gray.500"
                endColor="gray.400"
              />
            ) : (
              <UserAvatar
                source={{ uri: 'https://github.com/Gabriel-Jesusvix.png' }}
                alt="Imagem do usuario"
                size={PHOTO_SIZE}
              />
            )

          }

          <TouchableOpacity>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input
            placeholder="Nome"
            bg="gray.600"
          />
          <Input
            value="seuemail@gmail.com"
            isDisabled
            bg="gray.600"
          />
        </Center>

        <VStack px={10} mt={12} mb={9}>
          <Heading color="gray.200" fontSize="md" mb={2}>Alterar senha</Heading>
          <Input
            placeholder="Senha Antiga"
            secureTextEntry
            bg="gray.600"
          />
          <Input
            placeholder="Nova senha"
            secureTextEntry
            bg="gray.600"
          />
          <Input
            placeholder="Confirme Nova senha"
            secureTextEntry
            bg="gray.600"
          />
          <Button
            title="Atualizar"
            mt={4}
          />
        </VStack>

      </ScrollView>
    </VStack>
  )
}
