import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class FiltersGroup extends Component {
  state = {searchInput: '', selectedCategoryId: ''}

  renderSearchContainer = () => {
    const {onSearch} = this.props
    const {searchInput} = this.state
    const onChangeSearchInput = event => {
      const searchText = event.target.value
      this.setState({searchInput: searchText})
    }
    const onClickSearchButton = () => {
      onSearch(searchInput)
    }
    const onEnter = event => {
      if (event.key === 'Enter') {
        onClickSearchButton()
      }
    }
    return (
      <div className="filter-section-search-container">
        <input
          onChange={onChangeSearchInput}
          onKeyDown={onEnter}
          type="search"
          placeholder="Search"
          value={searchInput}
          className="search-input"
        />
        <button
          onClick={onClickSearchButton}
          type="button"
          className="search-button"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderCategorySection = () => {
    const {onCategory} = this.props
    const onClickCategoryButton = event => {
      const selectedCategoryId = event.currentTarget.value
      console.log('selectedCategoryId:', selectedCategoryId)
      onCategory(selectedCategoryId)
      this.setState({selectedCategoryId})

      // call update state with selectedCategoryId
    }

    const renderCategoryOptions = () => {
      // apply styling to active category button text
      const {selectedCategoryId} = this.state

      return (
        <ul className="filter-list">
          {categoryOptions.map(eachCat => {
            const activeFilterButtonClass =
              eachCat.categoryId === selectedCategoryId
                ? 'active-filter-button'
                : ''
            return (
              <li
                onClick={onClickCategoryButton}
                value={eachCat.categoryId}
                key={eachCat.categoryId}
                className="filter-list-item"
              >
                <p className={`filter-button ${activeFilterButtonClass}`}>
                  {eachCat.name}
                </p>
              </li>
            )
          })}
        </ul>
      )
    }

    return (
      <div className="filter-section-card">
        <h1 className="filter-title">Category</h1>
        {renderCategoryOptions()}
      </div>
    )
  }

  renderRatingSection = () => {
    const {onRating} = this.props
    const onClickRatingButton = event => {
      const selectedRatingId = event.currentTarget.value
      onRating(selectedRatingId)
      console.log(event)
      console.log('selectedRatingId:', selectedRatingId)

      // call update state with selectedRatingId
    }

    const renderRatingOptions = () => (
      <ul className="filter-list">
        {ratingsList.map(eachRat => (
          <li
            onClick={onClickRatingButton}
            value={eachRat.ratingId}
            key={eachRat.ratingId}
            className="filter-list-item"
          >
            <img
              alt={`rating ${eachRat.ratingId}`}
              src={eachRat.imageUrl}
              className="rating-stars-image"
            />
            <p className="rating-star-text">& up</p>
          </li>
        ))}
      </ul>
    )

    return (
      <div className="filter-section-card">
        <h1 className="filter-title">Rating</h1>
        {renderRatingOptions()}
      </div>
    )
  }

  renderClearFiltersButton = () => {
    const {onClear} = this.props
    const onClearFiltersButton = () => {
      console.log('Clear Filters Button')
      onClear()
    }
    return (
      <button
        type="button"
        onClick={onClearFiltersButton}
        className="clear-filters-button"
      >
        Clear Filters
      </button>
    )
  }

  render() {
    return (
      <div className="filters-group-container">
        {this.renderSearchContainer()}
        {this.renderCategorySection()}
        {this.renderRatingSection()}
        {this.renderClearFiltersButton()}
      </div>
    )
  }
}

export default FiltersGroup
