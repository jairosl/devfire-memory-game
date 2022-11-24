import "./styles.css"
export interface ICard {
  id: string
  flipped?: boolean
  image: string
  handleClick?: (id: string) => void
}

export function Card({ flipped = false, image, handleClick, id }: ICard) {
  const cardContentClassNames = ["card__content"]
  flipped && cardContentClassNames.push("card__content--flipped")

  const handleClickFn = (id: string) => {
    if (handleClick != null) {
      handleClick(id)
    }
  }

  return (
    <div className="card" onClick={() => handleClickFn(id)}>
      <div className={cardContentClassNames.join(" ")}>
        <div className="card__face card__face--front">
          <img src="./card-images/backcard-img.png" />
        </div>
        <div className="card__face card__face--back">
          <img src={image} />
        </div>
      </div>
    </div>
  )
}
