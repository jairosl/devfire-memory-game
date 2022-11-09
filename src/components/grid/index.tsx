import { useEffect, useRef, useState } from "react";
import { Card, ICard } from "../card";
import { regenerateCard } from "../../util/card-util"
import "./styles.css"
export interface IGrid{
  cards: ICard[]
}
export function Grid({cards}:IGrid){
  const [stateCards, setStateCards] = useState(()=>{
    return regenerateCard(cards);
  });
  //estados de cards virados
  const firstCardTurned = useRef<ICard | null> (null);
  const secondCardTurned = useRef<ICard | null> (null);
  //contador de movimentos
  const [moves, setMoves] = useState (0);
  const [p1score, setp1Score] = useState (0);
  const [p2score, setp2Score] = useState (0);
  const handleReset = () =>{
    setStateCards(regenerateCard(cards));
    setMoves(0);
    setp1Score(0);
    setp2Score(0);
  }
  const handleClick = (id: string)=>{
    const newStateCards = stateCards.map((card)=>{

      //caso o id do card nao seja o id clicado, nada acontece
      if(card.id !== id) return card;
      //se o card estiver virado, nada acontece
      if(card.flipped) return card;
      
      //vira o card
      card.flipped = true;

      //regras de negócio para cartões virados
      //caso o primeiro cartão seja virado, definir o segundo...
      if(firstCardTurned.current === null){
        firstCardTurned.current = card;
      }else if(secondCardTurned.current === null){
        secondCardTurned.current = card;
      }

      if(firstCardTurned.current && secondCardTurned.current){
        if(firstCardTurned.current.image === secondCardTurned.current.image){
          //tentativa com acerto
          firstCardTurned.current = null;
          secondCardTurned.current = null;
          if(moves % 2 === 0){
            setp1Score((p1score)=> p1score +1)
          }else if(moves % 2 === 1){
            setp2Score((p2score)=> p2score +1)
          }
          setMoves((m)=> m+1);
        }else{
          setTimeout(() => {
            if(firstCardTurned.current && secondCardTurned.current){
              firstCardTurned.current.flipped = false;
              firstCardTurned.current = null;
              secondCardTurned.current.flipped = false;
              secondCardTurned.current = null;
            }
            }, 300);
        }
        setMoves((m)=> m+1);
      }

      return card;
    });
    setStateCards(newStateCards);
  }

  return (
    <>
    <div className="Scores">
    <h1>
      <p>Player 1: {p1score}</p>
      <p>Player 2: {p2score}</p>
      <p>Movimentos: {moves}</p>
    </h1>
    <button onClick={handleReset}> Resetar/Reembaralhar </button>

    </div>
    <div className="grid">
    {stateCards.map(card=>{
      return <Card {...card} key={card.id} handleClick={handleClick}  />
    })}
    </div>
    </>
  )
}
