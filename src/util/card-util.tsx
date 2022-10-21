//duplica os cards e mistura

import { ICard } from "../components/card";
import { cards } from "../data/cards";

export const shuffleArray = (firstArr: any[], secondArr: any[]): ICard[]=>{
  return [...firstArr, ...secondArr].sort(()=> Math.random() -0.5);
}

//funçao para gerar ID unico

const keyGen = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

//atrela id unico ao elemento do card e retorna um array com IDs unicos e misturados

export const regenerateCard = (cards: ICard[]): ICard[] => {
  return shuffleArray([...cards.map((card) => ({ ...card, id: keyGen() }))],
  cards.map((card) => ({ ...card, id: keyGen() })));
};

console.log(regenerateCard(cards));