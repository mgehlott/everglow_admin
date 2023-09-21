export interface IUser {
  firstName: string
  lastName: string
  email: string
  userType?: Array<number>
  _id: string
  createdAt: string | null
  isActive: boolean
}
