import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserAvatar } from "@components/UserAvatar";
import { useAuth } from "@contexts/AuthContext";
import { yupResolver } from '@hookform/resolvers/yup';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Center, Heading, Skeleton, Text, VStack, useToast } from "native-base";
import React, { useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, TouchableOpacity } from "react-native";
import { FormDataProps, profileSchema } from "./Profile";


export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const { user } = useAuth();
  const [imageProfile, setImageProfile] = useState('https://github.com/Gabriel-Jesusvix.png');

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email
    },
  });
  const PHOTO_SIZE = 33;
  const toast = useToast();

  async function handlePhotoUserSelect() {
    setPhotoIsLoading(true);

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }
      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);
        if (photoInfo.exists && (photoInfo.size / 1024 / 1024 > 5)) {
          return toast.show({
            title: 'Essa imagem é muito grande, escolha uma de até 5MB',
            placement: 'top-right',
            bgColor: 'red.500'
          });
        }
        setImageProfile(photoSelected.assets[0].uri);
        setPhotoIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }

  }

  async function handleProfileUpdate(data: FormDataProps) {
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
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400" />
          ) : (
            <UserAvatar
              source={{ uri: imageProfile }}
              alt="Imagem do usuario"
              size={PHOTO_SIZE} />
          )}

          <TouchableOpacity onPress={handlePhotoUserSelect}>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                bg="gray.600"
                placeholder='Nome'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message} />
            )} />
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="E-mail"
                isDisabled
                onChangeText={onChange}
                value={value} />
            )} />
        </Center>

        <VStack px={10} mt={12} mb={9}>
          <Heading color="gray.200" fontSize="md" mb={2}>Alterar senha</Heading>
          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange} />
            )} />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message} />
            )} />
          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Confirme a nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message} />
            )} />
          <Button
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)} />
        </VStack>

      </ScrollView>
    </VStack>
  );
}
