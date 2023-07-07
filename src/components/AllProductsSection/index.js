import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const apiResponseStatusConstants = {
  success: 'SUCCESS',
  failed: 'FAILED',
  notFound: 'NOT_FOUND',
  inProgress: 'IN_PROGRESS',
}

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    activeOptionId: sortbyOptions[0].optionId,
    category: '',
    search: '',
    rating: '',
    apiStatus: apiResponseStatusConstants.inProgress,
  }

  componentDidMount() {
    this.getProducts()
  }

  onSearch = id => {
    this.setState({search: id}, this.getProducts)
  }

  onCategory = id => {
    this.setState({category: id}, this.getProducts)
  }

  onRating = id => {
    this.setState({rating: id}, this.getProducts)
  }

  onClear = () => {
    this.setState({category: '', search: '', rating: ''}, this.getProducts)
  }

  getProducts = async () => {
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, category, search, rating} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${category}&title_search=${search}&rating=${rating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      console.log(fetchedData.products.length)
      if (fetchedData.products.length === 0) {
        this.setState({
          apiStatus: apiResponseStatusConstants.notFound,
        })
      } else {
        this.setState({
          productsList: updatedData,
          apiStatus: apiResponseStatusConstants.success,
        })
      }
    } else {
      this.setState({apiStatus: apiResponseStatusConstants.failed})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state

    // TODO: Add No Products View
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderNotFound = () => (
    <div className="not-found-section">
      <img
        alt="no products"
        className="no-products-image"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
      />
      <h1 className="not-found-title">No Products Found</h1>
      <p className="not-found-desc">
        We could not find any products. Try other Filters
      </p>
    </div>
  )

  renderFailed = () => (
    <div className="not-found-section">
      <img
        alt="products failure"
        className="no-products-image"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
      />
      <h1 className="not-found-title">Oops! Something Went Wrong</h1>
      <p className="not-found-desc">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderDisplay = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiResponseStatusConstants.inProgress:
        return this.renderLoader()
      case apiResponseStatusConstants.success:
        return this.renderProductsList()
      case apiResponseStatusConstants.notFound:
        return this.renderNotFound()
      case apiResponseStatusConstants.failed:
        return this.renderFailed()

      default:
        return null
    }
  }

  // TODO: Add failure view

  render() {
    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          onCategory={this.onCategory}
          onRating={this.onRating}
          onSearch={this.onSearch}
          onClear={this.onClear}
        />

        {this.renderDisplay()}
      </div>
    )
  }
}

export default AllProductsSection
