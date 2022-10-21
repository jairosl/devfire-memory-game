import './styles.css';

export interface ICard{
  id: string;
  flipped?: boolean;
  image: string;
  handleClick?: (id: string) => void;
}

export function Card({flipped = false, image, id}: ICard){
  return(
    <div className="card">
      <div className="card__container">
        <div className="back">
          <img src="./card-images/backcard-img.png" alt="" />
        </div>
        <div className="front"></div>
      </div>
    </div>
  )
}