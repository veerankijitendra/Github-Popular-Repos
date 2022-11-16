import './index.css'

const LanguageFilterItem = props => {
  const {item, alterTheLanguage, activeLanguage} = props
  const {id, language} = item
  const style = activeLanguage === id ? 'button active' : 'button'

  const changeLanguage = () => {
    alterTheLanguage(id)
  }

  return (
    <li className="button-con">
      <button type="button" onClick={changeLanguage} className={style}>
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
