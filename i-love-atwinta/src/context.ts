import { createContext } from 'react'
import RootStore from '~/store/modules/RootStore'

export const StoreContext = createContext<RootStore | null>(null)