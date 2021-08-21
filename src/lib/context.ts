import {createContext} from 'react'

import IUser from '../interfaces/IUser'

const user: IUser = null

export const UserContext = createContext({ user })