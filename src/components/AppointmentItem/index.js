import './index.css'

const ListItem = props => {
  const {details, onStar} = props
  const {name, description, id, isStarred} = details

  const onStarred = () => {
    onStar(id)
  }

  const URL = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="list-container">
      <div className="text-container">
        <p className="heading">{name}</p>
        <p className="description">Date:{description}</p>
      </div>
      <button date-testid="star" className="imageUrl" onClick={onStarred}>
        <img alt="star" src={URL} />
      </button>
    </li>
  )
}

export default ListItem
