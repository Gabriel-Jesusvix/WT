import { api } from "@services/api";
import { storageGetUser, storageUserRemove, storageUserSave } from "@storage/storageUser";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { UserDTO } from "src/DTO/UserDTO";



type AuthProvider = {
  children: ReactNode
}
type AuthContextDataProps = {
  user: UserDTO
  singIn: (email: string, password: string) => Promise<void>;
  isLoadingUserStorageData: boolean;
  signOut: () => Promise<void>;
}
const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthProvider({ children }: AuthProvider) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);
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

  async function getUserStorageData() {
    try {
      const userLogged = await storageGetUser()

      if (userLogged) {
        setUser(userLogged)
        setIsLoadingUserStorageData(false)
      }
    } catch (error) {
      throw error;
    }
     finally {
      setIsLoadingUserStorageData(false)
     }

  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);
      await storageUserRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }
  useEffect(() => {
    getUserStorageData()
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      singIn,
      isLoadingUserStorageData,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}



export function useAuth() {
  const context = useContext(AuthContext)

  return context;
}
