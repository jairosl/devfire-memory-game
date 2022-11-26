import { useEffect, useRef, useState } from "react"
import { Card, ICard } from "../card"
import { regenerateCard } from "../../util/card-util"
import "./styles.css"
import { usePlay } from "../../contexts/play"
import { useNavigate } from "react-router-dom"
export interface IGrid {
  cards: ICard[]
}
export function Grid({ cards }: IGrid) {
  const { nicknamePlayerOne, nicknamePlayerTwo } = usePlay()
  const navigation = useNavigate()

  const [stateCards, setStateCards] = useState(() => {
    return regenerateCard(cards)
  })

  // estados de cards virados
  const firstCardTurned = useRef<ICard | null>(null)
  const secondCardTurned = useRef<ICard | null>(null)

  // contador de movimentos
  const [moves, setMoves] = useState(0)
  const [p1score, setp1Score] = useState(0)
  const [p2score, setp2Score] = useState(0)

  const handleReset = () => {
    setStateCards(regenerateCard(cards))
    setMoves(0)
    setp1Score(0)
    setp2Score(0)
  }

  const handleWinner = () => {
    if (p1score >= 7) {
      alert(`O Vencedor é ${nicknamePlayerOne}`)
    } else {
      alert(`O Vencedor é ${nicknamePlayerTwo}`)
    }

    navigation("/")
  }

  useEffect(() => {
    if (p1score >= 7 || p2score >= 7) {
      handleWinner()
    }
  }, [p1score, p2score])

  const handleClick = (id: string) => {
    const newStateCards = stateCards.map((card) => {
      // caso o id do card nao seja o id clicado, nada acontece
      if (card.id !== id) return card
      // se o card estiver virado, nada acontece
      if (card?.flipped ?? false) return card

      // vira o card
      card.flipped = true

      // regras de negócio para cartões virados
      // caso o primeiro cartão seja virado, definir o segundo...
      if (firstCardTurned.current === null) {
        firstCardTurned.current = card
      } else if (secondCardTurned.current === null) {
        secondCardTurned.current = card
      }

      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (firstCardTurned.current && secondCardTurned.current != null) {
        if (firstCardTurned.current.image === secondCardTurned.current.image) {
          // tentativa com acerto
          firstCardTurned.current = null
          secondCardTurned.current = null
          if (moves % 2 === 0) {
            setp1Score((p1score) => p1score + 1)
          } else if (moves % 2 === 1) {
            setp2Score((p2score) => p2score + 1)
          }
          setMoves((m) => m + 1)
        } else {
          setTimeout(() => {
            if (firstCardTurned.current !== null && secondCardTurned.current !== null) {
              firstCardTurned.current.flipped = false
              firstCardTurned.current = null
              secondCardTurned.current.flipped = false
              secondCardTurned.current = null
            }
          }, 10)
        }
        setMoves((m) => m + 1)
      }

      return card
    })
    setStateCards(newStateCards)
  }

  return (
    <>
      <div className="h-screen bg-[url('/bg.png')] bg-no-repeat bg-cover flex items-center justify-start flex-col ">
        <h2 className="flex w-1/2 justify-between mt-10 mb-7">
          <p
            className={`font-pixel text-red-500 text-4xl  uppercase font-bold ${
              moves % 2 === 0 ? "text-shadow-white" : ""
            }`}
          >
            {nicknamePlayerOne}: {p1score}
          </p>
          <p className="font-pixel t text-white text-4xl uppercase font-bold">
            Movimentos: {moves}
          </p>
          <p
            className={`font-pixel text-blue-500 text-4xl uppercase font-bold ${
              moves % 2 === 1 ? "text-shadow-white" : ""
            }`}
          >
            {nicknamePlayerTwo}: {p2score}
          </p>
        </h2>

        <div className="grid">
          {stateCards.map((card) => {
            return <Card {...card} key={card.id} handleClick={handleClick} />
          })}
        </div>

        <button
          className="bg-pink-100 text-white font-pixel text-3xl px-6 py-2 rounded-full shadow-2xl uppercase mt-6"
          onClick={handleReset}
        >
          Resetar/Reembaralhar
        </button>
      </div>
    </>
  )
}
