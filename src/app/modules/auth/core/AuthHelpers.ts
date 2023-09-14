import {AuthModel, UserModel} from './_models'
const AUTH_LOCAL_STORAGE_KEY = 'auth-admin-token'
const USER_LOCAL_STORAGE_KEY = 'auth-admin-user'
const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return
  }
  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }
  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel
    if (auth) {
      // You can easily check auth_token expiration also
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}
const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return
  }
  try {
    const lsValue = JSON.stringify(auth)
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}
const removeAuth = () => {
  if (!localStorage) {
    return
  }
  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}
const getUser = (): UserModel | undefined => {
  if (!localStorage) {
    return
  }
  const lsValue: string | null = localStorage.getItem(USER_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }
  try {
    const user: UserModel = JSON.parse(lsValue) as UserModel
    if (user) {
      // You can easily check auth_token expiration also
      return user
    }
  } catch (error) {
    console.error('USER LOCAL STORAGE PARSE ERROR', error)
  }
}
const setUser = (user: UserModel) => {
  if (!localStorage) {
    return
  }
  try {
    const lsValue = JSON.stringify(user)
    localStorage.setItem(USER_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('USER LOCAL STORAGE SAVE ERROR', error)
  }
}
const removeUser = () => {
  if (!localStorage) {
    return
  }
  try {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}
export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    (config: {headers: {Authorization: string}}) => {
      const auth = getAuth()
      if (auth && auth.token) {
        config.headers.Authorization = `Bearer ${auth.token}`
      }
      return config
    },
    (err: any) => Promise.reject(err)
  )
}
export {
  getAuth,
  setAuth,
  removeAuth,
  AUTH_LOCAL_STORAGE_KEY,
  USER_LOCAL_STORAGE_KEY,
  getUser,
  setUser,
  removeUser,
}
