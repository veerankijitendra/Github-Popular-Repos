import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    language: languageFiltersData[0].id,
    repositoryList: [],
    apiResponseStatus: false,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {language} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${language}`
    const options = {method: 'GET'}
    const response = await fetch(url, options)
    const data = await response.json()
    const fetchedData = data.popular_repos
    const updatedData = fetchedData.map(each => ({
      avatarUrl: each.avatar_url,
      forksCount: each.forks_count,
      issuesCount: each.issues_count,
      starsCount: each.stars_count,
      id: each.id,
      name: each.name,
    }))
    this.setState({repositoryList: updatedData, apiResponseStatus: true})
  }

  renderingOfRepositoryItem = () => {
    const {repositoryList} = this.state
    return (
      <ul className="repos-list-con">
        {repositoryList.map(each => (
          <RepositoryItem key={each.id} item={each} />
        ))}
        {/* <RepositoryItem item={repositoryList[0]} /> */}
      </ul>
    )
  }

  renderingLoaderItem = () => (
    <div className="loader-con">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  render() {
    const {apiResponseStatus} = this.state
    return (
      <div className="github-popular-repos-bg">
        <div className="popular-repo">
          <h1 className="popular-heading">Popular</h1>
          <ul className="language-list-con">
            {languageFiltersData.map(each => (
              <LanguageFilterItem key={each.id} item={each} />
            ))}
            {/* <LanguageFilterItem /> */}
          </ul>
          {apiResponseStatus
            ? this.renderingOfRepositoryItem()
            : this.renderingLoaderItem()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
