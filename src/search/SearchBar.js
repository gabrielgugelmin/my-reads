import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  render () {
    return (
      <div className="search__bar">
        <div className="search__input">
          <input
            onChange={this.props.searchBooks}
            placeholder="Procurar por título ou autor"
            type="text"
            value={this.props.searchQuery}
          />
        </div>
      </div>
    )
  }
}

SearchBar.propTypes = {
	searchBooks: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
}

export default SearchBar