import React, { Component } from 'react'
import { normalizeText } from '../helpers/normalizeText'

class ShelfTitle extends Component {

  render () {
    return (
      <h2 className="bookshelf__title">{normalizeText(this.props.shelfTitle)}</h2>
    )
  }
}

export default ShelfTitle