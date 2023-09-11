import {ILoginData} from '../../types'

export const APIJSON = {
  login: ({email, password}: ILoginData) => {
    return {
      email: email,
      password: password,
    }
  },
}
