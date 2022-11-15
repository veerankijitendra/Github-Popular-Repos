import './index.css'

const LanguageFilterItem = props => {
  const {item, alterTheLanguage} = props
  const {id, language} = item

  const changeLanguage = () => {
    alterTheLanguage(id)
  }

  return (
    <li className="button-con">
      <button type="button" onClick={changeLanguage} className="button">
        {language}
      </button>
    </li>
  )
}

LanguageFilterItem.defaultProps = {
  item: {id: 'ALL', language: 'All'},
  alterTheLanguage: () => {},
}

export default LanguageFilterItem
