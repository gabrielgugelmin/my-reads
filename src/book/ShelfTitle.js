import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { normalizeText } from '../helpers/normalizeText';

class ShelfTitle extends Component {
  render () {
    return (
      <h2 className="bookshelf__title">{normalizeText(this.props.shelfTitle)}</h2>
    )
  }
}

ShelfTitle.propTypes = {
  shelfTitle: PropTypes.string.isRequired
}

export default ShelfTitle