import { useState, createContext, useContext, ReactNode } from "react"

interface Play {
  nicknamePlayerOne: string
  nicknamePlayerTwo: string
  changeNamePlayerOne: (nickname: string) => void
  changeNamePlayerTwo: (nickname: string) => void
}

export const PlayContext = createContext<Play | null>(null)

interface PlayProviderProps {
  children: ReactNode
}

export function PlayProvider({ children }: PlayProviderProps) {
  const [playOne, setPlayOne] = useState("")
  const [playTwo, setPlayTwo] = useState("")

  function changeNamePlayerOne(nickname: string): void {
    setPlayOne(nickname)
  }

  function changeNamePlayerTwo(nickname: string): void {
    setPlayTwo(nickname)
  }

  return (
    <PlayContext.Provider
      value={{
        nicknamePlayerOne: playOne,
        nicknamePlayerTwo: playTwo,
        changeNamePlayerOne,
        changeNamePlayerTwo,
      }}
    >
      {children}
    </PlayContext.Provider>
  )
}

export function usePlay(): Play {
  const context = useContext(PlayContext)

  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
