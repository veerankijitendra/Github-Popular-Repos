import './index.css'

const RepositoryItem = props => {
  const {item} = props
  const {avatarUrl, forksCount, issuesCount, starsCount, name} = item
  console.log(item)

  return (
    <li className="card-con">
      <img src={avatarUrl} alt="avatar" className="image" />
      <p className="name">{name}</p>
      <div className="icon-count-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon"
        />
        <p className="count">{starsCount}</p>
      </div>
      <div className="icon-count-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon"
        />
        <p className="count">{forksCount}</p>
      </div>
      <div className="icon-count-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="issues"
          className="icon"
        />
        <p className="count">{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
