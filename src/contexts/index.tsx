import { ReactNode } from "react"
import { PlayProvider } from "./play"

interface ProviderProps {
  children: ReactNode
}

export function Providers({ children }: ProviderProps): JSX.Element {
  return <PlayProvider>{children}</PlayProvider>
}
