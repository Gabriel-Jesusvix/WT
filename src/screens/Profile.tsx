import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserAvatar } from "@components/UserAvatar";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Center, Heading, Skeleton, Text, VStack, useToast } from "native-base";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";


export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [imageProfile, setImageProfile] = useState('https://github.com/Gabriel-Jesusvix.png');
  const PHOTO_SIZE = 33
  const toast = useToast()

  async function handlePhotoUserSelect() {
    setPhotoIsLoading(true)

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,

      });

      if (photoSelected.canceled) {
        return
      }
      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)
        if(photoInfo.exists && (photoInfo.size / 1024 / 1024 > 5)){
          return toast.show ({
            title: 'Essa imagem é muito grande, escolha uma de até 5MB',
            placement: 'top-right',
            bgColor: 'red.500'
          })
        }
        setImageProfile(photoSelected.assets[0].uri)
        setPhotoIsLoading(false)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }

  }

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
                source={{ uri: imageProfile }}
                alt="Imagem do usuario"
                size={PHOTO_SIZE}
              />
            )

          }

          <TouchableOpacity onPress={handlePhotoUserSelect}>
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
