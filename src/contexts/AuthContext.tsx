import { api } from "@services/api";
import { storageUserSave } from "@storage/storageUser";
import { ReactNode, createContext, useContext, useState } from "react";
import { UserDTO } from "src/DTO/UserDTO";



type AuthProvider = {
  children: ReactNode
}
type AuthContextDataProps = {
  user: UserDTO
  singIn: (email: string, password: string) => Promise<void>;
}
const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthProvider({ children }: AuthProvider) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)

  async function singIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })

      if (data.user) {
        setUser(data.user)
        storageUserSave(data.user)
      }


    } catch (error) {
      throw error;
    }

  }

  return (
    <AuthContext.Provider value={{
      user,
      singIn
    }}>
      {children}
    </AuthContext.Provider>
  )
}


export function useAuth() {
  const context = useContext(AuthContext)

  return context;
}
