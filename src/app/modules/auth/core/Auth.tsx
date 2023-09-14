import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
import {LayoutSplashScreen} from '../../../../_everglow/layout/core'
import {AuthModel, UserModel} from './_models'
import * as authHelper from './AuthHelpers'
import {getUserByToken} from './_requests'
import {WithChildren} from '../../../../_everglow/helpers'
type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  currentUser: UserModel | undefined
  saveUser: (user: UserModel | undefined) => void
  logout: () => void
}
const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: authHelper.getUser(),
  saveUser: () => {},
  logout: () => {},
}
const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)
const useAuth = () => {
  return useContext(AuthContext)
}
const AuthProvider: FC<WithChildren> = ({children}) => {
  const lauth = authHelper.getAuth()
  const luser = authHelper.getUser()
  console.log(lauth, luser)
  const [auth, setAuth] = useState<AuthModel | undefined>(lauth)
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>(luser)
  const saveAuth = (auth: AuthModel | undefined) => {
    console.log('save auth', auth)
    setAuth(auth)
    if (auth) {
      authHelper.setAuth(auth)
    } else {
      authHelper.removeAuth()
    }
  }
  const saveUser = (user: UserModel | undefined) => {
    console.log('save user', user)
    setCurrentUser(user)
    if (user) {
      authHelper.setUser(user)
    } else {
      authHelper.removeUser()
    }
  }
  const logout = () => {
    saveAuth(undefined)
    saveUser(undefined)
  }
  return (
    <AuthContext.Provider value={{auth, saveAuth, currentUser, saveUser, logout}}>
      {children}
    </AuthContext.Provider>
  )
}
const AuthInit: FC<WithChildren> = ({children}) => {
  const {auth, logout, saveUser} = useAuth()
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    console.log('effect')
    const requestUser = async () => {
      console.log('req', didRequest.current)
      try {
        if (!didRequest.current) {
          // const {data} = await getUserByToken(apiToken)
          // if (data) {
          //   setCurrentUser(data)
          // }
          console.log(authHelper.getUser())
          saveUser(authHelper.getUser())
        }
      } catch (error) {
        console.error(error)
        if (!didRequest.current) {
          logout()
        }
      } finally {
        setShowSplashScreen(false)
      }
      return () => (didRequest.current = true)
    }
    console.log('req', auth)
    if (auth) {
      requestUser()
    } else {
      console.log('logout')
      logout()
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])
  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}
export {AuthProvider, AuthInit, useAuth}
