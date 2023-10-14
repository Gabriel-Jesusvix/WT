import { IImageProps, Image } from "native-base";


type Props = IImageProps & {
  size: number;
}

export function UserAvatar({size, ...rest}: Props) {
  return(
    <Image
      w={size}
      h={size}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      {...rest}
    />
  )
}