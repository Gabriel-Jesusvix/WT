import { Input as NativeBaseInput } from 'native-base'

export function Input() {
  return (
    <NativeBaseInput 
      bg="gray.700"
      h={14}
      px={4}
      borderWidth={0}
      fontSize="md"
      color="white"
      fontFamily="body"
      mb={4}
    />
  )
  
}