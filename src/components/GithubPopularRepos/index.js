import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const status = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

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
    apiResponseStatus: status.initial,
  }

  componentDidMount() {
    this.getRepositories()
  }

  alterTheLanguage = id => {
    this.setState(
      {language: id, apiResponseStatus: status.initial},
      this.getRepositories,
    )
  }

  getRepositories = async () => {
    const {language} = this.state

    const url = `https://apis.ccbp.in/popular-repos?language=${language}`
    // const options = {method: 'POST'}
    const response = await fetch(url)
    console.log(response.ok)
    if (response.ok) {
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
      this.setState({
        repositoryList: updatedData,
        apiResponseStatus: status.success,
      })
    } else {
      console.log('hi')
      this.setState({
        apiResponseStatus: status.failure,
      })
    }
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

  renderingOfFailureView = () => (
    <div className="failure-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderingCases = () => {
    const {apiResponseStatus} = this.state
    switch (apiResponseStatus) {
      case status.initial:
        return this.renderingLoaderItem()

      case status.success:
        return this.renderingOfRepositoryItem()
      case status.failure:
        return this.renderingOfFailureView()

      default:
        return null
    }
  }

  render() {
    const {language} = this.state
    return (
      <div className="github-popular-repos-bg">
        <div className="popular-repo">
          <h1 className="popular-heading">Popular</h1>
          <ul className="language-list-con">
            {languageFiltersData.map(each => (
              <LanguageFilterItem
                key={each.id}
                item={each}
                activeLanguage={language}
                alterTheLanguage={this.alterTheLanguage}
              />
            ))}
          </ul>
          {this.renderingCases()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
