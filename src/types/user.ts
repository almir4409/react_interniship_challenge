//exact shape data that we getting from the api so not type errors
export interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  address: Address
  company: Company
}
//seperated this cuz i think its more complex and its own thing
export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: {
    lat: string
    lng: string
  }
}

export interface Company {
  name: string
  catchPhrase: string
  bs: string
}
//im using this when ill add new users
export interface NewUserForm {
  name: string
  email: string
}
//this is for the redux state
export interface UsersState {
  users: User[]
  loading: boolean
  error: string | null
}