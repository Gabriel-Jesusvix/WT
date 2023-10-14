import { ScreenHeader } from "@components/ScreenHeader";
import { UserAvatar } from "@components/UserAvatar";
import { Center, Skeleton, VStack } from "native-base";
import React, { useState } from "react";
import { ScrollView } from "react-native";

const PHOTO_SIZE = 33
export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  return (
    <VStack flex={1}>
      <ScreenHeader title="Profile" />
      <ScrollView>
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


        </Center>

      </ScrollView>
    </VStack>
  )
}
